// REACT
import * as React from 'react';
import BasePage from './BasePage';
import { createStyles, WithStyles, withStyles, LinearProgress, Tabs, Tab } from '@material-ui/core';
import MapComponent from '../components/TiepNhanSuCo/MapComponent';
import FormComponent from '../components/TiepNhanSuCo/FormComponent';
import ChuyenDonVi from '../components/TiepNhanSuCo/DonVi';

//Redux
import { initViewDiv } from '../actions/index'
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers';
import { alertActions } from '../services/main/action';
import { phanAnhSuCo, chuyenDonViTiepNhan,setLayer } from '../services/map/action';

// APP
import LayerInfo from '../models/LayerInfo';
import {
  LAYER as CST_LAYER
} from '../constants/map';

// ESRI
import Graphic = require('esri/Graphic');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import FeatureLayer from '../map-lib/layers/FeatureLayer';
import layerUtils from '../map-lib/support/LayerHelper';
import MSG from '../constants/MSG';
import { Model } from '../services/map/SuCo/model';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  formContainer: {
    width: 500,
    height: '100vh',
    overflow: 'auto',
  },
  mapContainer: {
    flexGrow: 1,
    height: '100vh'
  },
});

enum TabIndex {
  ThongTin, ChuyenTiep
};

type States = {
  tabIndex: number,
  maSuCo: string
};

type StateToProps = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView,
  newIDSuCo?: string
}

type DispatchToProps = {
  initViewDiv: (div: HTMLDivElement) => void,
  alertError: (message: string) => void,
  phanAnhSuCo: ( model: Model, geometry: __esri.Point) => Promise<boolean>,
  chuyenDonVi: (maSuCo: string, maDonVi: string) => Promise<boolean>,
  setLayer:(layer:FeatureLayer)=>void
};

type Props = {

} & DispatchToProps & StateToProps & WithStyles<typeof styles>;

class TNSCPage extends BasePage<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      tabIndex: TabIndex.ThongTin, maSuCo: ''
    };
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.layerInfos !== props.layerInfos && props.layerInfos) {
      this.initFL(props.layerInfos);
    }

    // cập nhật mã sự cố khi thay đổi newIDSuCo
    if (props.newIDSuCo && props.newIDSuCo != this.props.newIDSuCo) {
      this.setState({ maSuCo: props.newIDSuCo });
    }
  }

  render() {
    const { view, classes, newIDSuCo } = this.props;
    const { tabIndex: isChuyenDonVi, maSuCo } = this.state;
    let layer: FeatureLayer | undefined = undefined;
    if (view) layer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
    return (
      <div className={classes.root}>
        <div className={classes.formContainer}>
          {!layer && <LinearProgress />}
          <Tabs
            value={isChuyenDonVi}
            onChange={(e, newValue) => this.setState({ tabIndex: newValue })}
          >
            <Tab label="Thông tin" />
            <Tab label="Chuyển tiếp" />
          </Tabs>
          {view && layer && isChuyenDonVi === TabIndex.ThongTin &&
            <FormComponent
              view={view}
              layer={layer}
              onChangePoint={this.onChangePoint.bind(this)}
              newIDSuCo={newIDSuCo}
              phanAnh={this.phanAnhSuCo.bind(this)}
              chuyenDonVi={() => this.setState({ tabIndex: TabIndex.ChuyenTiep })}
            />}
          {isChuyenDonVi == TabIndex.ChuyenTiep &&
            <ChuyenDonVi
              onClose={() => this.setState({ tabIndex: TabIndex.ThongTin })}
              onSubmit={this.submitChuyenDonVi.bind(this)}
              onChangeMaSuCo={(value) => this.setState({ maSuCo: value })}
              maSuCo={maSuCo}
            />
          }
        </div>
        <div className={classes.mapContainer}>
          <MapComponent
            loadMapDiv={this.loadMapDiv.bind(this)}
            layerInfos={this.props.layerInfos}
            view={view}
          />
        </div>
      </div >
    );
  }

  private loadMapDiv(div: HTMLDivElement) {
    this.props.initViewDiv(div);
  }


  private initFL(layerInfos: LayerInfo[]) {
    try {
      const layers = layerUtils.assignLayer(layerInfos, this.props.id);

      if (this.props.view) {
        this.props.view.map.addMany(layers);
        // set sự cố
        {
          const layerSuCo = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
          // nếu không có layer thì báo lỗi
          if (!layerSuCo) {
            this.props.alertError(MSG.KHONG_TIM_THAY_LAYER);
            return;
          }
          layerSuCo.renderer = layerUtils.getSuCoRenderer();
          layerSuCo.minScale = 0;
          this.props.setLayer(layerSuCo);
        }
      }



      return true;
    } catch (error) {
      // lỗi
      return false;
    }
  }

  /**
   * Hiển thị vị trí lên bản đồ
   * @param point Vị trí hiển thị
   */
  private onChangePoint(point?: __esri.Point) {
    const view = this.props.view;
    if (view) {
      // nếu chưa khởi tạo
      let oldGraphic, newGraphic;
      oldGraphic = newGraphic = view.graphics.find(f => f.attributes.id === 'pointGraphicSelected');
      if (!oldGraphic) {
        newGraphic = new Graphic({
          attributes: { id: 'pointGraphicSelected' },
          geometry: point,
          symbol: new PictureMarkerSymbol({
            width: 20, height: 20,
            url: `/images/map/suco/marker.png`
          })
        });
      } else {
        view.graphics.remove(oldGraphic);
        newGraphic = oldGraphic.clone();
        if (point)
          newGraphic.geometry = point;
      }
      if (point)
        view.graphics.add(newGraphic);

    }
  }

  /**
   * Lưu thông tin sự cố
   * @param model Thông tin
   * @param geometry Vị trí
   */
  private phanAnhSuCo(model: Model, geometry: __esri.Point): Promise<boolean> {
      return this.props.phanAnhSuCo(model, geometry);
  }

  /**
   * Chuyển sự cố cho đơn vị
   */
  private async submitChuyenDonVi(donVi: string): Promise<boolean> {
    const { newIDSuCo } = this.props;
    if (newIDSuCo) {
      const isSuccess = await this.props.chuyenDonVi(newIDSuCo, donVi);
      // nếu thành công thì tắt màn hình chuyển đổi đơn vị
      isSuccess && this.setState({ tabIndex: TabIndex.ThongTin });
      return isSuccess;
    }
return false;
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  layerInfos: state.map.layerInfos,
  view: state.map.view,
  newIDSuCo: state.mapSuCo.newIDSuCo
});

export default connect(mapStateToProps,
  {
    initViewDiv,
    alertError: alertActions.error,
    phanAnhSuCo,
    chuyenDonVi: chuyenDonViTiepNhan,
    setLayer
  })
  (
    withStyles(styles)(TNSCPage)
  );