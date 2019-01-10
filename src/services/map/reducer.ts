import { MapActionType } from '../../actions/action-types';
import { MapAction } from '../../actions';
import LayerInfo from '../../models/LayerInfo';

export type Model = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView,
};

export const defaultState: Model = {
};

function reducer(state: Model = defaultState, action: MapAction): Model {
  switch (action.type) {
    case MapActionType.LAYERINFO_REQUEST:
    case MapActionType.LAYERINFO_FAIL:
      return state;
    case MapActionType.LAYERINFO_SUCESS:
      return { ...state, layerInfos: action.layerInfos }
    case MapActionType.VIEW_INIT:
      return { ...state, view: action.view }
    default:
      return state;
  }
}

export default reducer;