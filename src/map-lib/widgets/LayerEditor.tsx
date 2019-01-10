import * as React from 'react';
import { List, ListItem, Paper, LinearProgress } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

import Collection = require('esri/core/Collection');

import ViewModel from './LayerEditor/LayerEditorViewModel';
import ListItemModel from './LayerEditor/ListItemModel';
import RenderingItemModel from './LayerEditor/RenderingItemModel';

type States = {
  layers: ListItemModel[],
  isLoading: boolean
};

type Props = {
  layers: __esri.FeatureLayer[],
  view: __esri.MapView | __esri.SceneView;
};

export default class LayerEditorComponent
  extends React.Component<Props, States>{
  private viewModel: ViewModel;
  private rendering: RenderingItemModel;
  constructor(props: Props) {
    super(props);
    this.state = { layers: [], isLoading: false }
    this.viewModel = new ViewModel({
      view: props.view
    });

    this.rendering = new RenderingItemModel();

    // lấy danh sách đầu vào
    // tạo listitemmodel


  }

  componentDidMount() {
    let allLayers = this.props.view.map.allLayers.filter(f => f.type === 'group').toArray(),
      layers = this.props.layers;
    let items = this.rendering.run(allLayers, layers);
    this.setState({ layers: items });
  }


  render() {
    const { isLoading, layers } = this.state;
    return (
      <MuiThemeProvider>
        <Paper >
          {isLoading && <LinearProgress style={{ position: 'absolute', top: 0, left: 0 }} />}
          <List style={{ width: 300, maxHeight: 'calc(90vh - 120px)', overflowY: 'auto' }}>
            {
              layers.length > 0 &&
              layers
                .sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
                .map(m => this.renderListView(m))
            }
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }

  private renderListView(item: ListItemModel) {
    if (item.children.length > 0) {

      // nếu có sublayers
      let nestedItems = item.children
        .toArray()
        .sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
        .map(m =>
          this.renderListView(m)
        );

      return <ListItem primaryText={item.title}
        key={item.id}
        primaryTogglesNestedList={true}
        leftIcon={<i className="esri-icon-layers"></i>}
        nestedItems={nestedItems}
      />
    } else {
      // const geometryIcon = featureLayer.geometryType === 'point' || featureLayer.geometryType === 'mulitpoint' ?
      //   'esri-icon-radio-checked' : featureLayer.geometryType === 'polyline' ? 'esri-icon-polyline' :
      //     featureLayer.geometryType === 'polygon' ? 'esri-icon-polygon' : 'esri-icon-question';
      return <ListItem
        key={item.id}
        value={item.id}
        primaryText={item.title}
        onClick={() => this.viewModel.draw(item.layer as any)}
      // title={la.geometryType}
      // leftIcon={<i className={geometryIcon}></i>}
      />
    }
  }
}