// REACT
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import * as Popup from '../../map-lib/widgets/Popup';
import SearchWidget = require('esri/widgets/Search');
import Locator = require('esri/tasks/Locator');
import Locate = require('esri/widgets/Locate');
import Print = require('esri/widgets/Print');
import BasemapToggle = require('esri/widgets/BasemapToggle');
import LayerEditor from '../../map-lib/widgets/LayerEditor';
import FeatureLayer from '../../map-lib/layers/FeatureLayer';

// APP
import SearchComponent from './SearchComponent';
import StatisticComponent from './StatisticComponent';
import LayerInfo, { GroupLayer } from '../../models/LayerInfo';
import LayerUtils from '../../map-lib/support/LayerUtils';
type Props = {
  view?: __esri.MapView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
  hienDangTai: (mode: boolean) => void
};
type States = {
};

class QuanLyMangLuoiComponent extends React.Component<Props, States> {
  private mapDiv: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
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
              isEditable = layerInfo.IsEdit;
              showDeleteButton = layerInfo.IsDelete;
            }

            return {
              layer: layer,
              showDeleteButton,
              showAttachments,
              isEditable
            } as Popup.LayerInfo;
          }).toArray()
      });

      // Tìm kiếm
      {
        let content = document.createElement('div');
        ReactDOM.render(
          <SearchComponent
            view={view}
          />,
          content);

        let searchExpand = new Expand({
          content,
          expandIconClass: 'esri-icon-search',
          expandTooltip: 'Tìm kiếm',
          collapseTooltip: 'Đóng'
        });

        view.ui.add(searchExpand, 'top-right');
      }

      // Thống kê
      {
        let content = document.createElement('div');
        ReactDOM.render(
          <StatisticComponent
            view={view}
          />,
          content);
        let statisticExpand = new Expand({
          content,
          expandIconClass: 'esri-icon-chart',
          expandTooltip: 'Thống kê',
          collapseTooltip: 'Đóng'
        });
        view.ui.add(statisticExpand, 'top-right');
      }

      //Layer Editor
      {
        let content = document.createElement('div');

        const layers = view.map.allLayers
          .filter(f =>
            f.type === 'feature' && (f as FeatureLayer).layerInfo.IsCreate)
          .toArray();

        ReactDOM.render(
          <LayerEditor
            layers={layers as FeatureLayer[]}
            view={view} />,
          content);

        view.ui.add(new Expand({
          view,
          expandIconClass: 'esri-icon-edit',
          expandTooltip: 'Biên tập',
          content
        }), 'top-right');
      }

      view.ui.add(
        new Expand({
          content: new Print({
            view,
            printServiceUrl:
              'https://ditagis.com:6443/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
          }),
          expandIconClass: 'esri-icon-printer',
          expandTooltip: 'In',
          collapseTooltip: 'Đóng'
        }),
        'top-right');

      view.ui.add(new BasemapToggle({ view, nextBasemap: 'osm' }), 'bottom-left');

      view.ui.add(new Locate({ view }), 'bottom-right');
    }
  }

  render() {
    return (
      <div>
        <div className="mapDiv"
          ref={
            (element: HTMLDivElement) => this.mapDiv = element
          }
        >
        </div>
      </div>
    );
  }
}

export default QuanLyMangLuoiComponent;