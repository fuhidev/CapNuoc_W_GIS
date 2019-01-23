import MapImageLayer = require('esri/layers/MapImageLayer');
import FeatureLayer from '../layers/FeatureLayer';
import GroupLayer = require('esri/layers/GroupLayer');
import LayerInfo from '../../models/LayerInfo';
import { LAYER, APP_LAYER } from '../../constants/map';
import LayerList = require('esri/widgets/LayerList');
import UniqueValueRenderer = require('esri/renderers/UniqueValueRenderer');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import * as SuCo from '../../services/map/SuCo/model';
export default class LayerHelper {
	public static assignLayer(layerInfos: LayerInfo[], APP_NAME?: string): Array<__esri.Layer> {
		let layers: Array<__esri.Layer> = [];

		// lấy dữ liệu
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
					title: layerInfo.LayerTitle,
					visible: layerInfo.IsVisible
				});
			} else if (layerInfo.LayerID.endsWith('LYR')) {
				layerModel = new FeatureLayer({
					title: layerInfo.LayerTitle,
					url: layerInfo.Url,
					id: layerInfo.LayerID,
					visible: layerInfo.IsVisible,
					outFields: layerInfo.OutFields ? layerInfo.OutFields.split(',') : ['*'],
					definitionExpression: layerInfo.Definition
				});
				(layerModel as FeatureLayer).layerInfo = layerInfo;
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

	public static createLayerList(view: __esri.MapView | __esri.SceneView) {
		var layerList = new LayerList({
			view: view,
			listItemCreatedFunction: function (event: any) {
				const item = event.item;

				// nếu là dữ liệu nền hoặc dma thì cho tăng giảm độ mờ
				if (item.layer.id === LAYER.BASE_MAP) {
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

		layerList.on('trigger-action', LayerHelper.layerListTriggerAction);
		return layerList;
	}

	private static layerListTriggerAction(event: any) {

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

	public static getSuCoRenderer() {
		const baseUrl = '/images/map/suco';
		function renderUniqueValue(linhVuc: number) {
			return [SuCo.TinhTrang.MoiTiepNhan, SuCo.TinhTrang.DangXuLy, SuCo.TinhTrang.HoanThanh]
				.map(m => {
					const value = `${linhVuc != null ? linhVuc : -1}-${m}`;
					return {
						value,
						symbol: new PictureMarkerSymbol({
							width: 20, height: 20,
							url: `${baseUrl}/${value}.png`
						})
					} as __esri.UniqueValueRendererUniqueValueInfos;
				});
		}

		let uniqueValueInfos: __esri.UniqueValueRendererUniqueValueInfos[] = [];
		[SuCo.LinhVuc.CapNuoc, SuCo.LinhVuc.CayXanh, SuCo.LinhVuc.ChieuSang,
		SuCo.LinhVuc.DienLuc, SuCo.LinhVuc.GiaoThong, SuCo.LinhVuc.ThoatNuoc, SuCo.LinhVuc.VienThong]
			.forEach(linhVuc =>
				renderUniqueValue(linhVuc)
					.forEach(uniqueRender =>
						uniqueValueInfos.push(uniqueRender)));
		let renderer = new UniqueValueRenderer({
			field: 'LinhVuc', field2: 'TinhTrang', fieldDelimiter: '-',
			uniqueValueInfos,
			defaultSymbol: { type: 'simple-marker' }
		});
		return renderer;
	}
}