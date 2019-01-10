import { BASEMAP, LAYER } from '../../constants/map';
import QueryTask = require('esri/tasks/QueryTask');
export interface HanhChinhResult {
  MaPhuong: string;
  TenPhuong: string;
  MaQuan: string;
  TenQuan: string;
}

export default class HanhChinhUtils {
  static async getHanhChinhByGeometry(view: __esri.MapView|__esri.SceneView, geometry: __esri.Geometry):
    Promise<HanhChinhResult | null> {
    const basemap = view.map.findLayerById(LAYER.BASE_MAP) as __esri.MapImageLayer;
    if (basemap) {
      const hcLayer = basemap.findSublayerById(BASEMAP.INDEX_HANH_CHINH);
      if (hcLayer) {
        const queryTask = new QueryTask({
          url: hcLayer.url
        });

        const results = await queryTask.execute({
          geometry,
          outSpatialReference: view.spatialReference,
          where: '1=1',
          outFields: ['*']
        });

        if (results.features.length === 1) {
          const feature = results.features[0];
          return {
            MaPhuong: feature.attributes.MaHanhChinh,
            MaQuan: feature.attributes.MaHuyen,
            TenPhuong: feature.attributes.TenHanhChinh,
            TenQuan: feature.attributes.TenHuyen
          } as HanhChinhResult;
        } else {
          return null;
        }

      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}