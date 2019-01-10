import EsriFeatureLayer = require('esri/layers/FeatureLayer');
import LayerInfo from '../../models/LayerInfo';
class FeatureLayer extends EsriFeatureLayer {
  public layerInfo: LayerInfo = {} as any;
}

export default FeatureLayer;