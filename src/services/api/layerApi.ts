import { API_URL, post, get } from '.';
import LayerInfo from '../../models/LayerInfo';
export async function getLayerInfos(): Promise<LayerInfo[]> {
  var url = API_URL + '/Account/LayerInfo';
  try {
    var response = await get(url);
    return response.data as LayerInfo[];
  } catch (error) {
    return Promise.reject(error.Message);
  }
}