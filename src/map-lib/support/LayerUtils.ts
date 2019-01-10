import MapImageLayer = require('esri/layers/MapImageLayer');
import FeatureLayer from '../layers/FeatureLayer';
import GroupLayer = require('esri/layers/GroupLayer');
import LayerInfo from '../../models/LayerInfo';
import { LAYER, APP_LAYER } from '../../constants/map';
import UniqueValueRenderer = require('esri/renderers/UniqueValueRenderer');
import LayerList = require('esri/widgets/LayerList');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import { TrangThai, ThongTinPhanAnh } from '../../models/SuCo';
export default class LayerUtils {
  public static assignLayer(layerInfos: LayerInfo[], APP_NAME?: string): Array<__esri.Layer> {
    let layers: Array<__esri.Layer> = [];

    // lấy dữ liệu chuyên đề
    const lopDuLieu = layerInfos.filter(f =>
      ((APP_NAME && APP_LAYER[APP_NAME]
        && (APP_LAYER[APP_NAME].indexOf('*') !== -1
          || APP_LAYER[APP_NAME].indexOf(f.LayerID) !== -1)
      ) || !APP_NAME)
      && f.IsView // được quyền xem
    );
    lopDuLieu.forEach(layerInfo => {
      let layerModel: __esri.Layer | null = null;
      if (layerInfo.Url.endsWith('MapServer')) {
        layerModel = new MapImageLayer({
          url: layerInfo.Url,
          id: layerInfo.LayerID,
          title: layerInfo.LayerTitle
        });
      } else if (layerInfo.LayerID.endsWith('LYR')) {
        layerModel = new FeatureLayer({
          title: layerInfo.LayerTitle,
          url: layerInfo.Url,
          id: layerInfo.LayerID,
          labelsVisible: layerInfo.LayerID === LAYER.DMA,
          outFields: layerInfo.OutFields ? layerInfo.OutFields.split(',') : ['*'],
        });
        (layerModel as FeatureLayer).layerInfo = layerInfo;
        if (layerInfo.Definition) {
          (layerModel as FeatureLayer).addDefinitionExpression(layerInfo.Definition);
        }
      }

      if (layerModel) {
        // nếu có group
        if (layerInfo.GroupLayer) {
          const groupID = layerInfo.GroupLayer.ID;
          // kiểm tra id có tồn tại trong grouplayer hay chưa
          let groupLayer = layers.find(l => l.id === groupID) as GroupLayer;
          if (!groupLayer) {
            groupLayer = new GroupLayer({
              title: layerInfo.GroupLayer.Name, id: layerInfo.GroupLayer.ID
            });
            layers.push(groupLayer); // đưa group vào danh sách trả về
          }
          groupLayer.add(layerModel); // thêm layer vào group
        } else {
          layers.push(layerModel); // không có group thì thêm trực tiếp vào danh sách trả về
        }
      }
    });
    return layers;
  }
  public static changeSymbolSuCo(suCoLayer: __esri.FeatureLayer) {
    let unique = new UniqueValueRenderer({
      valueExpression: `IIF($feature.TrangThai == 0 && ($feature.ThongTinPhanAnh == ${ThongTinPhanAnh.OngBe} || $feature.ThongTinPhanAnh == ${ThongTinPhanAnh.XiDHN} || $feature.ThongTinPhanAnh == ${ThongTinPhanAnh.KhongNuoc}),-1,$feature.TrangThai)`,
      defaultSymbol: { type: 'simple-marker' },
      uniqueValueInfos: [
        {
          value: -1,
          symbol: new PictureMarkerSymbol({
            url: '/images/map/-1.gif',
            width: 12, height: 12
          })
        },
        {
          value: TrangThai.CHUA_SUA,
          symbol: new PictureMarkerSymbol({
            url: '/images/map/' + TrangThai.CHUA_SUA + '.png',
            width: 12, height: 12
          })
        },
        {
          value: TrangThai.DA_SUA,
          symbol: new PictureMarkerSymbol({
            url: '/images/map/' + TrangThai.DA_SUA + '.png',
            width: 12, height: 12
          })
        },
      ]
    });
    suCoLayer.renderer = unique;
    return suCoLayer;
  }

  public static createLayerList(view: __esri.MapView) {
    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function (event: any) {
        const item = event.item;

        // nếu là dữ liệu nền hoặc dma thì cho tăng giảm độ mờ
        if (item.layer.id === LAYER.DMA || item.layer.id === LAYER.BASE_MAP) {
          item.actionsSections = [
            [{
              title: 'Tăng mờ',
              className: 'esri-icon-up',
              id: 'decrease-opacity'
            }, {
              title: 'Giảm mờ',
              className: 'esri-icon-down',
              id: 'increase-opacity'
            }]
          ];
        }

        // nếu là group
        if (item.layer.type === 'group') {
          item.actionsSections = [
            [{
              title: 'Hiện tất cả',
              className: 'esri-icon-visible',
              id: 'visible'
            }, {
              title: 'Đóng tất cả',
              className: 'esri-icon-non-visible',
              id: 'non-visible'
            }]
          ];
        }
        item.panel = {
          content: 'legend',
          open: false
        };
      }
    });

    layerList.on('trigger-action', LayerUtils.layerListTriggerAction);
    return layerList;
  }

  public static layerListTriggerAction(event: any) {

    // The layer visible in the view at the time of the trigger.
    var layer = event.item.layer;
    if (!layer) { return; }
    // Capture the action id.
    var id = event.action.id;

    switch (id) {
      case 'increase-opacity':
        if (layer.opacity < 1) { layer.opacity += 0.25; }
        break;
      case 'decrease-opacity':
        if (layer.opacity > 0) { layer.opacity -= 0.25; }
        break;
      case 'visible':
        (layer as __esri.GroupLayer).layers.forEach(f => f.visible = true);
        break;
      case 'non-visible':
        (layer as __esri.GroupLayer).layers.forEach(f => f.visible = false);
        break;

      default:
        break;
    }
  }
}