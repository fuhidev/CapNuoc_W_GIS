import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import LayerList = require('esri/widgets/LayerList');
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import * as Popup from '../../map-lib/widgets/Popup';
import SearchWidget = require('esri/widgets/Search');
import GroupLayer = require('esri/layers/GroupLayer');
import Locator = require('esri/tasks/Locator');
import * as layerApi from '../../apis/layerApi';
import * as api from '../../apis/QuanLySanLuongKHApi';
import * as constant from '../../constants/map';

import {
  LAYER as CST_LAYER
} from '../../constants/map';
import LayerInfo from '../../models/LayerInfo';
import ToolComponent from './ToolComponent';
import BieuDoTieuThuComponent from './BieuDoTieuThuComponent';
import { TieuThuKhachHang } from '../../models/SanLuongKhachHang';
import layerUtils from '../../map-lib/support/LayerUtils';

type Props = {
  view?: __esri.MapView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
  hienDangTai: (mode: boolean) => void
};
type States = {
  bieuDoTieuThu: {
    datas?: TieuThuKhachHang[],
    isLoading: boolean,
    error?: string,
    isOpen: boolean,
    danhBo?: string
  }
};

class QLSLKHComponent extends React.Component<Props, States> {
  private mapDiv: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      bieuDoTieuThu: {
        isLoading: true,
        isOpen: false
      },
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
      var layerList = layerUtils.createLayerList(view);

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
        includeDefaultSources:false,
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
          },
          {
            featureLayer: view.map.findLayerById(CST_LAYER.DONG_HO_KHACH_HANG),
            searchFields: ['DBDONGHONUOC'],
            outFields: ['*'],
            displayField: 'DBDONGHONUOC',
            placeholder: 'Tìm đồng hồ khách hàng'
          }
        ]
      });

      view.ui.add(search, 'top-right');

      // Bảng công cụ
      let toolExpandContent = document.createElement('div');
      ReactDOM.render(
        <ToolComponent
          view={view}
        />,
        toolExpandContent);
      let toolExpand = new Expand({
        expandTooltip: 'Bảng công cụ',
        expandIconClass: 'esri-icon-filter',
        content: toolExpandContent
      });

      view.ui.add(toolExpand, 'top-right');
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
        bieuDoTieuThu: {
          datas: [],
          error: undefined,
          isLoading: true,
          isOpen: false
        }
      });
    }
  }

  /**
   * Bắt sự kiện thay đổi đối tượng hiển thị popup
   */
  private popupSelectedFeatureChangeHandle(newVal: __esri.Graphic, oldVal: __esri.Graphic) {

    if (newVal && newVal.layer && newVal.layer.id === constant.LAYER.DONG_HO_KHACH_HANG
      && (newVal !== oldVal)) {
      const maDanhBo = newVal.attributes.DBDONGHONUOC;
      if (maDanhBo) {
        this.setState({
          bieuDoTieuThu: {
            datas: [],
            error: undefined,
            isLoading: true,
            isOpen: true,
            danhBo: maDanhBo
          }
        });

        api.laySanLuongTheoNam({ danhBa: maDanhBo })
          .then((result: any) => {
            this.setState({
              bieuDoTieuThu: {
                datas: result,
                error: result.length === 0 ? 'Không có dữ liệu' : undefined,
                isLoading: false,
                isOpen: true,
                danhBo: maDanhBo
              }
            });
          })
          .catch((e: any) => {
            this.setState({
              bieuDoTieuThu: {
                datas: [],
                error: e && e.Message && e.Message,
                isLoading: false,
                isOpen: true
              }
            });
          });
      } else {
        this.setState({
          bieuDoTieuThu: {
            datas: [],
            error: 'Không tồn tại mã danh bộ',
            isLoading: false,
            isOpen: true
          }
        });
      }
    } else {
      this.setState({
        bieuDoTieuThu: {
          datas: [],
          error: undefined,
          isLoading: true,
          isOpen: false
        }
      });
    }
  }

  render() {
    const { bieuDoTieuThu } = this.state;
    return (
      <div
        className="mapDiv"
        ref={
          (element: HTMLDivElement) => this.mapDiv = element
        }
      >
        <BieuDoTieuThuComponent
          datas={bieuDoTieuThu.datas}
          error={bieuDoTieuThu.error}
          isLoading={bieuDoTieuThu.isLoading}
          isOpen={bieuDoTieuThu.isOpen}
          danhBo={bieuDoTieuThu.danhBo ? bieuDoTieuThu.danhBo : ''}
        />
      </div>
    );
  }
}

export default QLSLKHComponent;