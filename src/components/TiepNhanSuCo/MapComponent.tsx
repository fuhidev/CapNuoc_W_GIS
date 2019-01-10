// REACT
import * as React from 'react';
import { LinearProgress } from 'material-ui';

// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import Locate = require('esri/widgets/Locate');
import HomeWidget = require('esri/widgets/Home');


// APP
import * as Popup from '../../map-lib/widgets/Popup';
import {
  LAYER as CST_LAYER,
} from '../../constants/map';
import LayerInfo from '../../models/LayerInfo';
import LayerUtils from '../../map-lib/support/LayerUtils';

type Props = {
  view?: __esri.MapView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
  isLoading: boolean,
  className: string
};
type States = {
  isLoading: boolean
};

class ThemSuCoComponent extends React.Component<Props, States> {
  private mapDiv: HTMLDivElement;

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
    this.props.loadMapDiv(this.mapDiv);
  }

  private initWidget(props: Props) {
    const { view, layerInfos } = props;
    if (view && layerInfos) {
      var layerList = LayerUtils.createLayerList(view);

      view.ui.add(new HomeWidget({ view }), 'top-left');

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

    }
  }

  render() {
    const { isLoading, className } = this.props;
    return (
      <div className={className}>
        {isLoading && <LinearProgress />}
        <div className="mapDiv"
          ref={
            (element: HTMLDivElement) => this.mapDiv = element
          }
        >
        </div>
      </div >
    );
  }

}

export default ThemSuCoComponent;