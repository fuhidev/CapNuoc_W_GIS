import { API_URL, post, get } from './api';
import LayerInfo from '../models/LayerInfo';
export function layLayerInfos(): Promise<LayerInfo[]> {
  var url = API_URL + '/layerinfo';
  return get(url) as any;
}