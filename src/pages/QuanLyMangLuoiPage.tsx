// REACT
import * as React from 'react';

// APP
import MapComponent from '../components/QuanLyMangLuoi/MapComponent';
import Header from '../components/Header/Header';
import LayerInfo from '../models/LayerInfo';
import * as layerApi from '../apis/layerApi';
import {
  MAP as CST_MAP,
} from '../constants/map';
import layerUtils from '../map-lib/support/LayerUtils';

// ESRI
import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import { LinearProgress } from 'material-ui';
import { Route } from '../modules/routers';
type States = {
  isLoading: boolean,
  view?: MapView,
  layerInfos?: LayerInfo[];
};

type Props = {
  name: string,
  id: string,
  routes:Route[]
};

class QLMLPage extends React.Component<Props, States> {
  private map: EsriMap;
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    const { isLoading, view, layerInfos } = this.state;

    return (
      <div>
        <Header title={this.props.name} routes={this.props.routes} />
        {isLoading && <LinearProgress />}
        <div className={this.props.id}>
          <MapComponent
            layerInfos={layerInfos}
            loadMapDiv={this.loadMapDiv.bind(this)}
            view={view}
            hienDangTai={this.hienDangTai.bind(this)}
          />
        </div>
      </div>
    );
  }

  private loadMapDiv(div: HTMLDivElement) {
    this.map = new EsriMap({ basemap: 'hybrid' });
    const view = new MapView({
      map: this.map,
      container: div,
      center: CST_MAP.CENTER,
      zoom: CST_MAP.ZOOM
    });

    layerApi.layLayerInfos()
      .then(layerInfos => {
        this.initFL(layerInfos);
        this.hienDangTai(false);
        this.setState({
          view, layerInfos
        });
      });
  }

  private initFL(layerInfos: LayerInfo[]) {
    try {
      const layers = layerUtils.assignLayer(layerInfos, this.props.id);

      // mặc định không hiển thị trừ dữ liệu nền
      // layers.forEach(f => { if (f.id !== CST_LAYER.BASE_MAP) { f.visible = false; } });

      this.map.addMany(layers);

      return true;
    } catch (error) {
      // lỗi
      return false;
    }
  }

  private hienDangTai(isShow: boolean = true) {
    this.setState({
      isLoading: isShow
    });
  }
}

export default QLMLPage;