// REACT
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Snackbar } from 'material-ui';

// ESRI
import Expand = require('esri/widgets/Expand');
import Legend = require('esri/widgets/Legend');
import SearchWidget = require('esri/widgets/Search');
import Action = require('esri/support/actions/ActionButton');
import Locator = require('esri/tasks/Locator');
import BasemapToggle = require('esri/widgets/BasemapToggle');
import Graphic = require('esri/Graphic');
// APP
import * as Popup from '../../map-lib/widgets/Popup';
import * as api from '../../apis/SuCoApi';
import {
  LAYER as CST_LAYER
} from '../../constants/map';
import LayerInfo from '../../models/LayerInfo';
import ToolComponent from '../../components/QLSC/ToolComponent';
import KetQuaTimKiemComponent from './KetQuaTimKiemComponent';
import TTKHMatNuocComponent from './TTKHMatNuocComponent';
import { KetQuaTruyVan } from '../../models/SuCo';
import { ThongKe, TrangThai } from '../../models/SuCo';
import LayerUtils from '../../map-lib/support/LayerUtils';
import HanhChinhUtils from '../../map-lib/support/HanhChinhUtils';
import Auth from '../../modules/Auth';

type Props = {
  view?: __esri.MapView,
  loadMapDiv: (mapDiv: HTMLDivElement) => void,
  layerInfos?: LayerInfo[],
  hienDangTai: (mode: boolean) => void
};
type States = {
  ketQuaTruyVan?: KetQuaTruyVan[],
  hienThiKQTV: boolean// hiển thị kết quả truy vấn,
  snackbar: string, lstNhomKhacPhuc: string[]
};

class QLSCComponent extends React.Component<Props, States> {
  private mapDiv: HTMLDivElement;
  private toolDiv: HTMLDivElement;
  private ttkhmnDiv: HTMLDivElement;
  private handleViewClick: IHandle | null;
  private addSCBtn: HTMLSpanElement;


  constructor(props: Props) {
    super(props);
    this.state = {
      hienThiKQTV: false,
      snackbar: '', lstNhomKhacPhuc: []
    };

  }

  componentWillReceiveProps(props: Props) {
    if (!this.props.view && props.view
      && !this.props.layerInfos && props.layerInfos) {
      this.initWidget(props);
      this.thongKeSuCo(props);
      this.registerEvent(props.view);
    }
  }

  componentDidMount() {
    this.props.loadMapDiv(this.mapDiv);

    api.getDistinctNhomKhacPhuc()
      .then(r => this.setState({ lstNhomKhacPhuc: r }));
  }

  private initWidget(props: Props) {
    const { view, layerInfos } = props;
    if (view && layerInfos) {
      var layerList = LayerUtils.createLayerList(view);
      var expand =
        new Expand({
          expandTooltip: 'Lớp dữ liệu',
          content: layerList
        });

      view.ui.add(expand, 'top-left');
      // không có dòng này thì layerlist không load được legend
      new Legend({ view: view });

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

            let actions: __esri.ActionButton[] = [];

            // nếu là sự cố thì thêm action
            if (layer.id === CST_LAYER.DIEM_SU_CO) {
              actions.push(new Action({
                id: 'phieu-cong-tac',
                title: 'Phiếu công tác',
                className: 'esri-icon-documentation',
              }));
            }

            return {
              layer: layer,
              showDeleteButton,
              showAttachments,
              isEditable,
              actions
            } as Popup.LayerInfo;
          }).toArray()
      });

      view.popup.dockOptions.position = 'top-left';

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
          },
          {
            featureLayer: view.map.findLayerById(CST_LAYER.DIEM_SU_CO),
            searchFields: ['OBJECTID', 'IDSuCo', 'DiaChi', 'SDTPhanAnh', 'NguoiPhanAnh '],
            outFields: ['*'],
            exactMatch: false,
            placeholder: 'Tìm kiếm sự cố',
            withinViewEnabled: true,
            displayField: 'IDSuCo'
          }
        ]
      });

      view.ui.add(search, 'top-right');

      // Bảng công cụ
      let toolExpand = new Expand({
        expandTooltip: 'Bảng công cụ',
        expandIconClass: 'esri-icon-filter',
        content: this.toolDiv
      });
      toolExpand.expand();

      view.ui.add(toolExpand, 'top-right');

      // Thông tin khách hàng mất nước
      let ttkhmnExpand = new Expand({
        expandTooltip: 'Thôn tin khách hàng mất nước',
        expandIconClass: 'esri-icon-announcement',
        content: this.ttkhmnDiv
      });

      view.ui.add(ttkhmnExpand, 'top-right');

      view.ui.add(new BasemapToggle({ view, nextBasemap: 'osm' }), 'bottom-left');

      view.ui.add(this.addSCBtn, 'bottom-right');
    }
  }

  private onBtnAddClick() {
    const view = this.props.view;
    let message = 'Không nhận được view';
    if (view) {
      if (this.handleViewClick) {
        this.handleViewClick.remove();
        delete this.handleViewClick;
        message = 'Hủy chức năng thêm điểm sự cố';
        this.mapDiv.style.cursor = 'default';
        this.addSCBtn.classList.remove('esri-widget--button--active');
      } else {
        this.handleViewClick = view.on('click', this.onViewClick.bind(this))
        message = 'Chọn vị trí trên bản đồ để thêm điểm sự cố';
        this.mapDiv.style.cursor = 'crosshair';
        this.addSCBtn.classList.add('esri-widget--button--active');
      }
    }
    this.setState({
      snackbar: message
    });
  }

  private async onViewClick(e: __esri.MapViewClickEvent) {
    e.stopPropagation();
    const view = this.props.view;
    let message = '';
    try {
      this.props.hienDangTai(true);
      if (view) {
        const layer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;
        if (layer) {
          const viTri = e.mapPoint;
          // lấy layer điểm sự cố
          const layer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;
          if (!viTri) { throw 'Không xác định vị trí'; }

          const hanhChinh = await HanhChinhUtils.getHanhChinhByGeometry(view, viTri);
          if (!hanhChinh) {
            throw 'Sự cố không thuộc địa bàn quản lý';
          }

          const geometry = viTri;

          const attributes = {
            TrangThai: TrangThai.CHUA_SUA,
            NguoiPhanAnh: Auth.getUsername()
          };

          const featureAdd = new Graphic({
            attributes, geometry
          });

          const result = await layer.applyEdits({
            addFeatures: [featureAdd]
          });
          const addFeatureResult = result.addFeatureResults[0] as __esri.FeatureEditResult;
          if (addFeatureResult.error) {
            throw addFeatureResult.error;
          } else {
            if (addFeatureResult.objectId) {
              var idSuCo = await api.tiepNhanSuCo(addFeatureResult.objectId);
              const results = await layer.queryFeatures({
                returnGeometry: true, outSpatialReference: view.spatialReference,
                where: `OBJECTID = ${addFeatureResult.objectId}`, outFields: ['*']
              });

              view.popup.open({ features: results.features, updateLocationEnabled: true });

              message = 'Thêm thành công có mã ' + idSuCo;
            }
          }
        } else {
          throw 'Không có quyền truy cập lớp dữ liệu sự cố';
        }
      } else {
        throw 'Không tìm thấy MapView';
      }
    } catch (error) {
      message = typeof (error) === 'string' ? error : 'Có lỗi xảy ra!'
    }
    finally {
      this.setState({
        snackbar: message
      });
      this.props.hienDangTai(false);
    }

  }

  private registerEvent(view: __esri.MapView) {
    view.popup.on('trigger-action', this.triggerActionHandler.bind(this));
  }

  private async triggerActionHandler(event: {
    action: Action
  }) {
    try {
      const { view } = this.props;
      if (view) {
        const action = event.action,
          id = action.id;

        if (id === 'phieu-cong-tac') {
          var a = document.createElement('a');
          a.rel = 'noopener noreferrer';
          a.target = '_blank';
          a.href = api.inPhieuCongTac(view.popup.selectedFeature.attributes.IDSuCo);
          a.click();
        }
      }
    } catch (error) {
      this.setState({
        snackbar: 'Có lỗi xảy ra trong quá trình thực hiện'
      });
    }
    finally {
      this.props.hienDangTai(false);
    }
  }

  private async thongKeSuCo(props: Props) {
    const { view } = props;
    if (view) {

      ReactDOM.render(
        <ToolComponent
          hienDangTai={this.props.hienDangTai.bind(this)}
          view={view}
          hienKetQua={this.hienKetQua.bind(this)}
        />,
        this.toolDiv);
      ReactDOM.render(
        <TTKHMatNuocComponent
          view={view}
        />,
        this.ttkhmnDiv);
    }
  }

  render() {
    const { ketQuaTruyVan, hienThiKQTV,
      lstNhomKhacPhuc, snackbar } = this.state;

    return (
      <div>
        <div className="mapDiv"
          ref={
            (element: HTMLDivElement) => this.mapDiv = element
          }
        >
        </div>
        <div ref={(element: HTMLDivElement) => this.toolDiv = element}></div >
        <div ref={(element: HTMLDivElement) => this.ttkhmnDiv = element}></div >
        <div
          className="esri-widget--button esri-icon-plus-circled"
          onClick={this.onBtnAddClick.bind(this)}
          ref={(element: any) => this.addSCBtn = element}></div>
        <KetQuaTimKiemComponent
          datas={ketQuaTruyVan || []}
          nhomKhacPhucDatas={lstNhomKhacPhuc}
          isOpen={hienThiKQTV}
          onClose={() => this.setState({ hienThiKQTV: false })}
          onFocusGraphic={this.onFocusGraphic.bind(this)}
          onChangeNhomKhacPhuc={this.onChangeNhomKhacPhuc.bind(this)}
          updateNhomKhacPhuc={this.updateNhomKhacPhuc.bind(this)}
        />
        <Snackbar
          autoHideDuration={4000}
          open={snackbar.length > 0}
          message={snackbar}
          onRequestClose={(e: any) => this.setState({ snackbar: '' })}
        />
      </div >
    );
  }

  private async updateNhomKhacPhuc(objectId: number, nhomKhacPhuc: string) {
    const { view } = this.props;

    if (view) {
      const layer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;
      const result = await layer.applyEdits({
        updateFeatures: [{ attributes: { objectId, NhomKhacPhuc: nhomKhacPhuc } } as __esri.Graphic]
      });

      if ((result.updateFeatureResults as __esri.FeatureEditResult[])[0].objectId) {
        // nếu chưa có dữ liệu trong danh sách gợi ý thì thêm vào
        if (this.state.lstNhomKhacPhuc.indexOf(nhomKhacPhuc) === -1)
          this.setState({ lstNhomKhacPhuc: [...this.state.lstNhomKhacPhuc, nhomKhacPhuc] });
        return true;
      }
      return false;

    }
  }

  private onChangeNhomKhacPhuc(idSuCo: string, nhomThucHien: string) {
    const { ketQuaTruyVan } = this.state;

    if (ketQuaTruyVan) {
      let dataCopy = ketQuaTruyVan.slice();
      let model = dataCopy.find(f => f.IDSuCo === idSuCo);
      if (model) {
        model.NhomKhacPhuc = nhomThucHien;
        this.setState({ ketQuaTruyVan: dataCopy });
      }

    }
  }

  private hienKetQua(ketQuaTruyVan?: KetQuaTruyVan[]) {
    const isDisplay = ketQuaTruyVan != undefined || ketQuaTruyVan != null;
    this.setState({
      hienThiKQTV: isDisplay,
      ketQuaTruyVan: ketQuaTruyVan || [],
      snackbar: isDisplay ? `Đã tìm thấy ${ketQuaTruyVan ? ketQuaTruyVan.length : 0} đối tượng, kéo xuống để xem kết quả` : ''
    });
  }

  private async onFocusGraphic(id: string) {
    try {
      const { view } = this.props;
      if (view) {
        const layer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;
        if (!layer) { return false; }
        const resultExtent = await layer.queryFeatures({
          where: `IDSuCo = '${id}'`,
          outFields: ['*'],
          returnGeometry: true,
          outSpatialReference: view.spatialReference
        });

        if (resultExtent && resultExtent.features.length > 0) {
          view.popup.open({
            features: resultExtent.features,
            updateLocationEnabled: true
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default QLSCComponent;