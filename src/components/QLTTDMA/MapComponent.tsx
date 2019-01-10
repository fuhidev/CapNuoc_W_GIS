// REACT
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import * as Popup from '../../map-lib/widgets/Popup';
import SearchWidget = require('esri/widgets/Search');
import Locator = require('esri/tasks/Locator');

// APP
import {
  LAYER as CST_LAYER
} from '../../constants/map';
import LayerInfo from '../../models/LayerInfo';
import ToolComponent from './ToolComponent';
import BieuDoApLucComponent from './BieuDoApLucComponent';
import SearchComponent from './SearchComponent';
import LayerUtils from '../../map-lib/support/LayerUtils';
type Props = {
  view?: __esri.MapView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
  hienDangTai: (mode: boolean) => void
};
type States = {
  bieuDoApLuc: {
    isOpen: boolean,
    dma?: string,
  }
};
class QLTTDMAComponent extends React.Component<Props, States> {
  private mapDiv: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      bieuDoApLuc: {
        isOpen: false
      }
    };
  }

  componentWillReceiveProps(props: Props) {
    if (!this.props.view && props.view
      && !this.props.layerInfos && props.layerInfos) {
      this.initWidget(props);
      this.registerEvent(props.view);
    }
  }

  componentDidMount() {
    this.props.loadMapDiv(this.mapDiv);
  }

  private initWidget(props: Props) {
    const { view, layerInfos } = props;
    if (view && layerInfos) {
      view.ui.move(['zoom'], 'bottom-right');

      // tìm kiếm
      var search = new SearchWidget({
        view: view,
        searchAllEnabled: false,
        includeDefaultSources: false,
        sources: [
          {
            locator: new Locator({ url: '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer' }),
            singleLineFieldName: 'SingleLine',
            outFields: ['Addr_type'],
            countryCode: 'VNM',
            localSearchOptions: {
              minScale: 300000,
              distance: 50000
            },
            popupEnabled: false,
            placeholder: 'Tìm địa chỉ',
            name: 'Tìm địa chỉ',
          }
        ]
      });

      view.ui.add(search, 'top-left');

      var layerList = LayerUtils.createLayerList(view);

      var expand =
        new Expand({
          expandTooltip: 'Lớp dữ liệu',
          content: layerList
        });

      view.ui.add(expand, 'top-left');
      // không có dòng này thì layerlist không load được legend
      var legend = new Legend({ view: view });

      var popup = new Popup.default({
        view: view,
        layerInfos: view.map.allLayers.filter(f => f.type === 'feature')
          .map(layer => {
            const layerInfo = layerInfos.find(info => layer.id === info.LayerID);
            let showDeleteButton = false,
              showAttachments = true,
              isEditable = false;

            if (layerInfo) {
              isEditable = layerInfo.IsEdit
                && (layer.id === CST_LAYER.DMA || layer.id === CST_LAYER.DONG_HO_TONG);
            }

            return {
              layer: layer,
              showDeleteButton,
              showAttachments,
              isEditable
            } as Popup.LayerInfo;
          }).toArray()
      });

      // Bảng công cụ
      let toolExpandContent = document.createElement('div');
      ReactDOM.render(
        <ToolComponent
          dmaLayer={view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer}
          suCoLayer={view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer}
          goTo={view.goTo}
          view={view}
        />,
        toolExpandContent);
      let toolExpand = new Expand({
        expandTooltip: 'Bảng công cụ',
        expandIconClass: 'esri-icon-filter',
        content: toolExpandContent
      });

      view.ui.add(toolExpand, 'top-right');
      // Tìm kiếm

      let searchExpandContent = document.createElement('div');
      ReactDOM.render(
        <SearchComponent
          view={view}
        />,
        searchExpandContent);
      let searchExpand = new Expand({
        expandTooltip: 'Tìm kiếm',
        expandIconClass: 'esri-icon-search',
        content: searchExpandContent
      });

      view.ui.add(searchExpand, 'top-right');
    }
  }

  private registerEvent(view: __esri.MapView) {
    view.popup.watch('selectedFeature', this.popupSelectedFeatureChangeHandle.bind(this));
    view.popup.watch('visible', this.popupVisibleChangeHandle.bind(this));
  }

  /**
   * Bắt sự kiện đóng mở popup
   */
  private popupVisibleChangeHandle(newVal: boolean, oldVal: boolean) {
    // nếu newVal = false tức là popup đã tắt
    if (!newVal) {
      // tắt hiển thị biểu đồ tiêu thụ
      this.setState({
        bieuDoApLuc: {
          isOpen: false
        }
      });
    }
  }

  /**
   * Bắt sự kiện thay đổi đối tượng hiển thị popup
   */
  private popupSelectedFeatureChangeHandle(newVal: __esri.Graphic, oldVal: __esri.Graphic) {

    if (newVal && newVal.layer && newVal.layer.id === CST_LAYER.DMA
      && (newVal !== oldVal)) {
      const dma = newVal.attributes.MADMA;
      if (dma) {
        this.setState({
          bieuDoApLuc: {
            isOpen: true,
            dma
          }
        });

      } else {
        this.setState({
          bieuDoApLuc: {
            isOpen: true
          }
        });
      }
    } else {
      this.setState({
        bieuDoApLuc: {
          isOpen: false
        }
      });
    }
  }

  render() {
    const { bieuDoApLuc } = this.state;
    return (
      <div>
        <div className="mapDiv"
          ref={
            (element: HTMLDivElement) => this.mapDiv = element
          }
        >
        </div>
        <BieuDoApLucComponent
          isOpen={bieuDoApLuc.isOpen}
          dma={bieuDoApLuc.dma ? bieuDoApLuc.dma : ''}
        />
      </div>
    );
  }
}

export default QLTTDMAComponent;