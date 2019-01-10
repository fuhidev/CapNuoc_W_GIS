import EsriFeatureLayer = require('esri/layers/FeatureLayer');
import LayerInfo from '../../models/LayerInfo';
class FeatureLayer extends EsriFeatureLayer {
  public layerInfo: LayerInfo;
  public definitionExpressions: string[] = [];
  public addDefinitionExpression(definition: string) {
    this.definitionExpressions.push(definition);
    this.resetDefinitionExpression();
  }
  public resetDefinitionExpression() {
    this.definitionExpression = this.definitionExpressions.map(m => '(' + m + ')').join(' AND ');
  }
  public removeDefinitionExpression(definition: string) {
    let index = this.definitionExpressions.indexOf(definition);
    if (index > -1) {
      this.definitionExpressions.splice(index, 1);
      this.resetDefinitionExpression();
    }
  }
}

export default FeatureLayer;