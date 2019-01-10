import Collection = require('esri/core/Collection');
import ListItemModel from './ListItemModel';

export default class RenderingItemModel {
  private items: Collection<ListItemModel>;
  private allItem: Collection<ListItemModel>;

  // private layers: __esri.FeatureLayer;
  // private allLayers: __esri.Layer[];
  constructor() {
    this.items = new Collection();
    this.allItem = new Collection();

    // this.layers = params.layers;
    // this.allLayers=params.allLayers;
  }

  public run(allLayers: __esri.Layer[], layers: __esri.FeatureLayer[]): ListItemModel[] {
    this.items.removeAll(); this.allItem.removeAll();

    for (const layer of layers) {
      // nếu là feature
      if (layer.type === 'feature') {
        let featureLayer = layer as __esri.FeatureLayer;

        let item = new ListItemModel();
        item.id = featureLayer.id; item.title = featureLayer.title; item.layer = featureLayer;

        this.allItem.add(item);

        // kiểm tra feature thuộc group nào
        const groupLayer = this.getGroupLayer(allLayers, featureLayer);

        // nếu thuộc group 
        if (groupLayer) {
          // thì kiểm tra đã tồn tại group hay chưa
          let groupItem = this.allItem.find(f => f.layer === groupLayer);
          if (!groupItem) {
            // nếu chưa thì tạo group
            groupItem = this.createGroupItemModel(allLayers, groupLayer);
            // truy vấn ngược
            let parentGroupItem;
            let groupFind: ListItemModel | undefined = groupItem;
            do {
              parentGroupItem = groupItem;
              groupFind = groupItem.parent;
            } while (groupFind);
            this.items.add(parentGroupItem);
          }
          // thêm layer vào group và set parent và thêm layer vào children của group  
          item.parent = groupItem; groupItem.children.add(item);
        } else {
          this.items.push(item);
        }
      }
    }
    return this.items.toArray();
  }

  private getGroupLayer(layers: __esri.Layer[], layer: __esri.FeatureLayer | __esri.GroupLayer) {
    let groupLayers = layers.filter(f => f.type === 'group').map(m => m as __esri.GroupLayer);
    let groupLayer = groupLayers.find(f => f.layers.some(s => s.id === layer.id));
    return groupLayer;
  }

  private createGroupItemModel(layers: __esri.Layer[], groupLayer: __esri.GroupLayer) {
    let item = new ListItemModel();
    item.id = groupLayer.id; item.title = groupLayer.title; item.layer = groupLayer;
    // kiểm tra groupLayer có thuộc groupLayer khác hay không
    let parentGroup = this.getGroupLayer(layers, groupLayer);
    // nếu có thì tạo group
    if (parentGroup) {
      // nếu chưa thì tạo groupLayer parent
      let parentGroupItem = this.createGroupItemModel(layers, parentGroup);
      // set parent của groupLayer là groupLayer Parent và thêm groupLayer vào children của groupLayerParent
      item.parent = parentGroupItem; parentGroupItem.children.add(item);
    }
    this.allItem.add(item);
    return item;
  }

}