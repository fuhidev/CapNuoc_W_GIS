import PopupTemplate = require('esri/PopupTemplate');
import Action = require('esri/support/actions/ActionButton');
import PopupEditing from './Popup/Editing';
import HighlightGraphic from '../support/HighlightGraphic';
import Collection = require('esri/core/Collection');

const FIElDS_IGNORE = ['created_user', 'created_date', 'last_edited_user', 'last_edited_date'];
const FIELDS_NOTEDIT = ['MaPhuong', 'MaQuan', 'MaDuong', 'MaDMA'];

export enum PopupAction {
  EDIT,
  DELETE
}

export interface LayerFieldInfo {
  name: string;
  format?: object;
  isEditable?: boolean;
  alias?: string;
  domain?: __esri.Domain;
  type?: 'small-integer' | 'integer' | 'single'
  | 'double' | 'long' | 'string' | 'date' | 'oid' | 'geometry' | 'blob' | 'raster' | 'guid' | 'global-id' | 'xml';
}

export interface LayerInfo {
  layerFields: LayerFieldInfo[];
  isEditable?: boolean;
  layer: __esri.FeatureLayer;
  showAttachments?: boolean;
  showDeleteButton?: boolean;
  showObjectID?: boolean;
  showGlobalID?: boolean;
  actions?: __esri.ActionButton[];
}

interface ConstructorProperties {
  layerInfos: LayerInfo[];
  view: __esri.MapView;
}

class Popup {
  private view: __esri.MapView;
  private layerInfos: LayerInfo[];
  private editing: PopupEditing;
  private highlight: HighlightGraphic;
  constructor(params: ConstructorProperties) {
    this.view = params.view;
    this.layerInfos = params.layerInfos;

    this.layerInfos.forEach(f => {
      this.initPopup(f);
    });
    this.editing = new PopupEditing({ view: this.view });
    this.highlight = new HighlightGraphic(this.view);
    this.registerEvent();
  }

  /**
   * Khởi tạo poup cho layer
   * @param layerInfo Định nghĩa những lớp hiển thị popup
   */
  private initPopup(layerInfo: LayerInfo) {
    layerInfo.showObjectID = layerInfo.showObjectID != undefined ? layerInfo.showObjectID : false;
    layerInfo.showGlobalID = layerInfo.showGlobalID != undefined ? layerInfo.showGlobalID : false;
    layerInfo.showAttachments = layerInfo.showAttachments != undefined ? layerInfo.showAttachments : false;
    layerInfo.isEditable = layerInfo.isEditable != undefined ? layerInfo.isEditable : false;
    const { layer, isEditable, showDeleteButton, showAttachments, showGlobalID, showObjectID,
      actions } = layerInfo;
    layer.when((layerView: __esri.LayerView) => {

      let _actions: __esri.ActionButton[] = [];

      // nếu có action thì thêm vào
      if (actions && actions.length > 0) {
        actions.forEach(a => _actions.push(a));
      }

      // nếu được phép chỉnh sửa
      if (isEditable) {
        _actions.push(new Action({
          id: PopupAction.EDIT + '',
          title: 'Cập nhật',
          className: 'esri-icon-edit',
        }));
      }
      // nếu hiện nút xóa
      if (showDeleteButton) {
        _actions.push(new Action({
          id: PopupAction.DELETE + '',
          title: 'Xóa',
          className: 'esri-icon-erase',
        }));
      }
      let layerFields = new Collection<LayerFieldInfo>();
      if (layerInfo.layerFields) {
        layerInfo.layerFields.slice().forEach(layerField => {
          let field = layer.fields.find(_field => _field.name === layerField.name);
          if (field) {
            if (!layerField.alias) {
              layerField.alias = field.alias;
            }
            layerField.domain = field.domain;
            layerField.type = field.type as any;
            layerFields.add(layerField);
          }
        });
      } else {
        // nếu không có thì tự tạo

        // lấy tất cả field từ layer
        let _fields: __esri.Field[] = [];
        if (layer.outFields.indexOf('*') !== -1) {
          _fields = layer.fields;
        } else if (layer.outFields.length > 0) {
          // lọc danh sách field có trong outFields
          _fields = layer.fields.filter(f => layer.outFields.indexOf(f.name) !== -1);
        }
        layerFields.addMany(_fields.map(m => {
          return {
            name: m.name,
            isEditable: isEditable, // mặc định không cho chỉnh sửa,
            domain: m.domain,
            alias: m.alias,
            type: m.type
          } as LayerFieldInfo;
        }));

      }

      if (!showObjectID) {
        let oidField = layerFields.find(f => f.type === 'oid');
        if (oidField) {
          layerFields.remove(oidField);
        }
      }
      if (!showGlobalID) {
        let gldField = layerFields.find(f => f.type === 'global-id');
        if (gldField) {
          layerFields.remove(gldField);
        }
      }

      FIElDS_IGNORE.forEach(fieldIgnore => {
        let field = layerFields.find(f => f.name === fieldIgnore);
        if (field) {
          layerFields.remove(field);
        }
      });

      FIELDS_NOTEDIT.forEach(fieldNoedit => {
        let field = layerFields.find(f => f.name === fieldNoedit);
        if (field) {
          field.isEditable = false;
        }
      })

      layerInfo.layerFields = layerFields.toArray();


      let content = [{
        type: 'fields',
        fieldInfos: layerFields.map(m => {
          return {
            fieldName: m.name,
            label: m.alias,
          };
        })
      }];

      if (showAttachments) {
        content.push({
          type: 'attachments'
        } as any);
      }
      var popupTemplate = new PopupTemplate({
        title: layer.title,
        content,
        actions: _actions
      });
      layer.popupTemplate = popupTemplate;
    });
  }

  /**
   * Đăng ký sự kiện
   */
  private registerEvent() {
    // đăng ký sự kiện khi click vào action
    this.view.popup.on('trigger-action', this.triggerActionHandler.bind(this));

    this.view.popup.watch('visible', (newValue: boolean) => {
      if (!newValue) {
        this.highlight.clear();
      }
    });
    this.view.popup.watch('selectedFeature', (newValue: __esri.Graphic, oldValue: __esri.Graphic) => {
      this.highlight.clear();
      if (newValue && newValue !== oldValue) {
        this.highlight.add(
          this.view.popup.selectedFeature
        );
      }
    });
  }

  private triggerActionHandler(event: {
    action: Action
  }) {
    let actionId = event.action.id;
    switch (actionId) {

      // sự kiện cập nhật
      case PopupAction.EDIT.toString():
        let layerInfos = this.layerInfos.find(f => f.layer.id === this.view.popup.selectedFeature.layer.id);
        if (layerInfos) {
          this.editing.render(layerInfos.layerFields);
        }
        break;
      // sự kiện xóa
      case PopupAction.DELETE.toString():
        this.editing.delete();
        break;
      default:
        break;
    }
  }
}

export default Popup;