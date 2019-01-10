import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EditingComponent from './EditingComponent';
import { LayerFieldInfo } from '../Popup';
interface ConstructProperties {
  view: __esri.MapView | __esri.SceneView;
}

class PopupEditing {
  private view: __esri.MapView | __esri.SceneView;
  constructor(params: ConstructProperties) {
    this.view = params.view;
  }

  public render(layerFields: LayerFieldInfo[]) {
    let div = document.createElement('div');
    ReactDOM.render(
      <EditingComponent
        layerFieldsInfos={layerFields}
        graphic={this.view.popup.selectedFeature}
        onSave={this.onSave.bind(this)}
        capNhatHinhAnh={this.capNhatHinhAnh.bind(this)}
      />,
      div);
    this.view.popup.content = div;
  }

  private async onSave(attributes: object) {
    try {
      const layer = this.view.popup.selectedFeature.layer as __esri.FeatureLayer;

      var updateAttributes = {
        objectId: this.view.popup.selectedFeature.attributes.OBJECTID,
      };

      for (const key in this.view.popup.selectedFeature.attributes) {
        if (attributes[key] !== this.view.popup.selectedFeature.attributes[key]) {
          updateAttributes[key] = attributes[key];
        }
      }

      let result = await layer.applyEdits({
        updateFeatures: [
          {
            attributes: updateAttributes
          } as __esri.Graphic
        ]
      });

      let updateFeatureResults = result.updateFeatureResults as __esri.FeatureEditResult[];

      if (updateFeatureResults[0].objectId) {
        let query = layer.createQuery();
        query.outFields = ['*'];
        query.where = 'OBJECTID=' + updateAttributes.objectId;
        layer.queryFeatures(query).then(res => {
          this.view.popup.open({
            features: res.features
          });
        });
      }
      return result.updateFeatureResults.length > 0 && !result.updateFeatureResults[0].error;

    } catch (err) {
      return false;
    }

  }

  public async delete() {
    if (confirm('Chắc chắn xóa')) {
      try {
        const objectId = this.view.popup.selectedFeature.attributes.OBJECTID;
        const layer = this.view.popup.selectedFeature.layer as __esri.FeatureLayer;
        let res = await layer.applyEdits({
          deleteFeatures: [{
            objectId
          }]
        });
        this.view.popup.close();
        return res.deleteFeatureResults.length > 0 && !res.deleteFeatureResults[0].error;
      } catch (error) {
        return false;
      }
    }
  }

  private async capNhatHinhAnh(form: HTMLFormElement): Promise<__esri.FeatureEditResult> {
    const graphic = this.view.popup.selectedFeature,
      layer = graphic.layer as __esri.FeatureLayer
    const result = await layer.addAttachment(graphic, form);
    return result;
  }
}
export default PopupEditing;