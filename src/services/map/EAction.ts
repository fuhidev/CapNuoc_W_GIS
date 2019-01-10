import { MapActionType } from './action-types';
import LayerInfo from '../../models/LayerInfo';
export type MapAction =
  { type: MapActionType.LAYERINFO_REQUEST }
  | { type: MapActionType.LAYERINFO_SUCESS, layerInfos: LayerInfo[] }
  | { type: MapActionType.LAYERINFO_FAIL, error: string }
  | { type: MapActionType.VIEW_INIT, view: __esri.MapView | __esri.SceneView }
  | { type: MapActionType.VIEWDIV_INIT, div: HTMLDivElement }

export * from "./SuCo/EAction";