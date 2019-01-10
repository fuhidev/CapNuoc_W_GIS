import { alertActions, MapAction, loading } from '../../actions';
import { MapActionType } from '../../actions/action-types';
import { Dispatch } from 'redux';
import LayerInfo from '../../models/LayerInfo';
import { getLayerInfos as api } from '../index';

//ESRI
import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import {
  MAP as CST_MAP
} from '../../constants/map';
import { MSG_MAP } from '../../constants/MSG';

export const getLayerInfos = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(request());
    dispatch(loading.loadingReady());
    api()
      .then(data => {
        dispatch(success(data));
        dispatch(loading.loadingFinish());
      })
      .catch(err => {
        dispatch(failure(err || MSG_MAP.LAYERINFO_FAIL))
        dispatch(loading.loadingFinish());
        dispatch(alertActions.error(err || MSG_MAP.LAYERINFO_FAIL));
      });
  }
  function request(): MapAction { return { type: MapActionType.LAYERINFO_REQUEST } }
  function success(layerInfos: LayerInfo[]): MapAction { return { type: MapActionType.LAYERINFO_SUCESS, layerInfos } }
  function failure(error: string): MapAction { return { type: MapActionType.LAYERINFO_FAIL, error } }
}

export const setView = (view: __esri.MapView | __esri.SceneView): MapAction => ({
  type: MapActionType.VIEW_INIT, view
});




export const initViewDiv = (div: HTMLDivElement) => {
  return (dispatch: Function) => {
    dispatch(initViewDiv(div));
    const map = new EsriMap({ basemap: 'hybrid' });
    const view = new MapView({
      map,
      container: div,
      center: CST_MAP.CENTER,
      zoom: CST_MAP.ZOOM,
      ui: {
        components: ['zoom']
      }
    });
    dispatch(setView(view));
    dispatch(getLayerInfos());
  }

  function initViewDiv(div: HTMLDivElement): MapAction {
    return { type: MapActionType.VIEWDIV_INIT, div }
  }
}
// export const initViewDiv = (div: HTMLDivElement): MapAction => ({
//   type: MapActionType.VIEWDIV_INIT, div
// })

export * from './SuCo/action';