// REACT
import * as React from 'react';

// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import SearchWidget = require('esri/widgets/Search');
import Locate = require('esri/widgets/Locate');

// APP
import * as Popup from '../../map-lib/widgets/Popup';
import {
  LAYER as CST_LAYER,
} from '../../constants/map';
import LayerInfo from '../../models/LayerInfo';
import layerUtils from '../../map-lib/support/LayerHelper';

type Props = {
  view?: __esri.MapView | __esri.SceneView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
};
type States = {
};

class MapComponent extends React.Component<Props, States> {
  private mapDiv: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillReceiveProps(props: Props) {
    if (!this.props.view && props.view
      && !this.props.layerInfos && props.layerInfos) {
      this.initWidget(props);
    }
  }

  componentDidMount() {
    if (this.mapDiv) { this.props.loadMapDiv(this.mapDiv); }
  }

  private initWidget(props: Props) {
    const { view, layerInfos } = props;
    if (view && layerInfos) {
      var layerList = layerUtils.createLayerList(view);

      layerList.on('trigger-action', this.layerListTriggerAction.bind(this));
      var expand =
        new Expand({
          expandTooltip: 'Lớp dữ liệu',
          content: layerList
        });

      view.ui.add(expand, 'top-left');
      // không có dòng này thì layerlist không load được legend
      new Legend({ view: view });

      // định vị
      view.ui.add(new Locate({ view }), 'top-left');

      new Popup.default({
        view: view,
        layerInfos: view.map.allLayers.filter(f => f.type === 'feature')
          .map(layer => {
            const layerInfo = layerInfos.find(info => layer.id === info.LayerID);
            let showDeleteButton = false,
              showAttachments = true,
              isEditable = false;

            if (layerInfo) {
              isEditable = layerInfo.IsEdit
                && layer.id === CST_LAYER.DIEM_SU_CO;
              showDeleteButton = layerInfo.IsDelete
                && layer.id === CST_LAYER.DIEM_SU_CO;
            }

            return {
              layer: layer,
              showDeleteButton,
              showAttachments,
              isEditable
            } as Popup.LayerInfo;
          }).toArray()
      });

      // tìm kiếm
      var search = new SearchWidget({
        view: view,
        searchAllEnabled: false,
      });

      view.ui.add(search, 'top-right');
    }
  }

  private layerListTriggerAction(event: any) {

    // The layer visible in the view at the time of the trigger.
    var layer = event.item.layer;
    if (!layer) { return; }
    // Capture the action id.
    var id = event.action.id;

    switch (id) {
      case 'decrease-opacity':
        if (layer.opacity < 1) { layer.opacity += 0.25; }
        break;
      case 'increase-opacity':
        if (layer.opacity > 0) { layer.opacity -= 0.25; }
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="mapDiv">
        <div
          ref={
            (element: HTMLDivElement) => this.mapDiv = element
          }
        >
        </div>
      </div >
    );
  }

}

export default MapComponent;