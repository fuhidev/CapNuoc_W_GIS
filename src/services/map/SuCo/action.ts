import { Dispatch } from 'redux';
import { MapSuCoAction } from './EAction';
import { MapSuCoActionType } from './action-types';
import { loading, alertActions } from '../../main/action';
import MSG from '../../../constants/MSG';
import { layMaSuCo } from '../../api/SuCoApi';
import Auth from '../../../modules/Auth';
import { SEARCH_OUTFIELDS, TinhTrang, Model } from './model';
import SuCoThongTinAPI from '../../../services/api/SuCoThongTinAPi';

//Esri
import FeatureLayer from '../../../map-lib/layers/FeatureLayer';
import SuCoThongTin from '../../../models/SuCoThongTin';
import { AllModelReducer } from '../../../reducers';


const apiSCTT = new SuCoThongTinAPI();


export const setInfos = (datas: any[]): MapSuCoAction => (
  { type: MapSuCoActionType.INFO_QUERY_SUCCESS, datas })

/**
 * 
 * @param layer Sự cố layer
 */
export const timKiemTheoTinhTrang = (code: string) => {
  return (dispatch: Dispatch<any>, getState: () => AllModelReducer) => {
    const layer = getLayer(getState());
    if (layer) {
      dispatch(loading.loadingReady());
      let where = `TinhTrang = '${code}'`;

      if (layer.layerInfo.Definition) {
        where = `${layer.layerInfo.Definition} and (${where})`;
      }

      layer.queryFeatures({
        where,
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ['TGPhanAnh DESC']
      })
        .then(results => dispatch(setInfos(results.features.map(m => m.attributes))))
        .catch(_ => dispatch(alertActions.error(MSG.CO_LOI_XAY_RA)))
        .always(() => dispatch(loading.loadingFinish()));
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  }
}
/**
 * 
 * @param layer Sự cố layer
 */
export const timKiem = (where: string) => {
  return (dispatch: Dispatch<any>, getState: () => AllModelReducer) => {
    const layer = getLayer(getState());
    if (layer) {
      dispatch(loading.loadingReady());
      if (layer.layerInfo.Definition) {
        where = `${layer.layerInfo.Definition} and (${where})`;
      }

      layer.queryFeatures({
        where,
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ['TGPhanAnh DESC']
      })
        .then(results => dispatch(setInfos(results.features.map(m => m.attributes))))
        .catch(_ => dispatch(alertActions.error(MSG.CO_LOI_XAY_RA)))
        .always(() => dispatch(loading.loadingFinish()));
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  }
}

export const emptyInfos = (): MapSuCoAction => ({
  type: MapSuCoActionType.INFO_QUERY_EMPTY
});

/**
 * Lưu dữ liệu sự cố
 * @param layer Sự cố layerr
 * @param info Thông tin
 * @param geometry Vị trí
 */
export const phanAnhSuCo = (info: Model, geometry: __esri.Point
) => {
  return async (dispatch: Dispatch<any>, getState: () => AllModelReducer): Promise<boolean> => {
    const layer = getLayer(getState());
    if (layer) {
      try {
        dispatch(loading.loadingReady());
        const user = Auth.getUser(); // Lây user
        const id = await layMaSuCo();

        // tạo attributes
        const attributes = {
          MaSuCo: id,
          TGPhanAnh: new Date().getTime() as any,
          TinhTrang: TinhTrang.MoiTiepNhan,
          SDTNguoiPhanAnh: info.SDTNguoiPhanAnh,
          NguoiPhanAnh: info.NguoiPhanAnh,
          DiaChi: info.DiaChi,
          NoiDungPhanAnh: info.NoiDungPhanAnh,
          LinhVuc: info.LinhVuc,
          NguyenNhan: info.NguyenNhan,
          MaHuyenTP: info.MaHuyenTP,
          MaPhuongXa: info.MaPhuongXa,
          NVTiepNhan: user ? user.username : '',
          OBJECTID: 1
        } as Model;

        // tạo graphic
        const featureAdd = {
          attributes, geometry
        } as any;

        // cập nhật dữ liệu với service
        const result = await layer.applyEdits({
          addFeatures: [featureAdd]
        });

        if (result.addFeatureResults[0].error) throw new Error(result.addFeatureResults[0].error);
        else {
          dispatch(alertActions.success('Mã sự cố: ' + id)); // thông báo
          dispatch(newIdSuCo(id));
          return true;
        }
      } catch (error) {
        dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
        return false;
      }
      finally {
        dispatch(loading.loadingFinish());
      }
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
      return false;
    }
  }

  function newIdSuCo(id: string): MapSuCoAction { return { type: MapSuCoActionType.NEW_ID_SUCO, id } };
}

/**
 * Chuyển sự cố cho đơn vị xử lý
 * @param maSuCo Mã sự cố chuyển tiếp cho đơn vị
 * @param maDonVi Mã đơn vị tiếp nhận sự cố
 */
export const chuyenDonViTiepNhan = (maSuCo: string, maDonVi: string) => {
  return async (dispatch: Dispatch<any>): Promise<boolean> => {
    dispatch(loading.loadingReady());
    try {
      const model = await apiSCTT.add({
        MaDonVi: maDonVi, MaSuCo: maSuCo
      } as SuCoThongTin);

      if (model) {
        // thêm thành công
        dispatch(alertActions.success(MSG.THANH_CONG));
        return true;
      } else {
        throw new Error(MSG.THAT_BAI);
      }
    } catch (error) {
      dispatch(alertActions.error(error ? error.message : MSG.CO_LOI_XAY_RA));
      return false;
    }
    finally {
      dispatch(loading.loadingFinish());
    }
  }
}


export const setLayer = (layer: FeatureLayer) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: MapSuCoActionType.SET_LAYER, layer });
    if (layer) {
      const result = await layer.queryFeatures({
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        where: '1=1'
      });
      dispatch(initialItems(result.features.map(m => m.attributes)))
    } else {
      dispatch(alertActions.error(MSG.KHONG_TIM_THAY_LAYER));
    }
  }
}

export const addItem = (data: Model): MapSuCoAction => ({
  type: MapSuCoActionType.ADD_ITEM,
  data
})

export const removeItem = (id: string): MapSuCoAction => ({
  type: MapSuCoActionType.REMOVE_ITEM,
  id
})

/* Used only by actions for sockets */
export const initialItems = (datas: Model[]): MapSuCoAction => ({
  type: MapSuCoActionType.INITIAL_ITEMS,
  datas
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */

export const loadItems = () => {

}

export const addNewItemSocket = (data: Model) => {
  return (dispatch: Dispatch, getState: () => AllModelReducer) => {
    getState().mapSuCo.socket.emit('add-item', data);
  }
}

export const removeItemSocket = (id: string) => {
  return (dispatch: Dispatch, getState: () => AllModelReducer) => {
    getState().mapSuCo.socket.emit('remove-item', id);
  }
}

const getLayer = (state: AllModelReducer) => {
  return state.mapSuCo.layer;
}

export const setThongTinChiTiet = (data?: Model): MapSuCoAction => ({
  type: MapSuCoActionType.SET_CHI_TIET, data
});

export const getThongTinChiTiet = (data: Model) => {
  return async (dispatch: Dispatch, getState: () => AllModelReducer)=>{
    try {
      const layer = getState().mapSuCo.layer;
      if (!layer) throw new Error(MSG.KHONG_TIM_THAY_LAYER)
      dispatch(loading.loadingReady());
      const result = await layer.queryRelatedFeatures({
        outFields: ['*'],
        returnGeometry: false,
        objectIds: [data.OBJECTID],
        relationshipId: 0
      });
      if (result[data.OBJECTID]) {
        data.SuCoThongTins = (result[data.OBJECTID].features as __esri.Graphic[]).map(m => m.attributes);
      }
      dispatch(setThongTinChiTiet(data));
    } catch (error) {
      dispatch(alertActions.error(error ? error.message || MSG.CO_LOI_XAY_RA:MSG.CO_LOI_XAY_RA  ));
    }
    finally{
      dispatch(loading.loadingFinish());
    }

  }
}