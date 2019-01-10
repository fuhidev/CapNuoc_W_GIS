// REACT
import * as React from 'react';

// APP
import MapComponent from '../components/QLSC/MapComponent';
import Header from '../components/Header/Header';
import LayerInfo from '../models/LayerInfo';
import * as layerApi from '../apis/layerApi';
import {
  MAP as CST_MAP,
  LAYER as CST_LAYER
} from '../constants/map';
import layerUtils from '../map-lib/support/LayerUtils';

// ESRI
import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import { LinearProgress } from 'material-ui';
import { Route } from '../modules/routers';
import FeatureLayer from '../map-lib/layers/FeatureLayer';
import { DEFAULT_DEF } from '../models/SuCo';

type States = {
  isLoading: boolean,
  view?: MapView,
  layerInfos?: LayerInfo[];
};

type Props = {
  name: string,
  id: string,
  routes: Route[]
};

class TiepNhanSuCoPage extends React.Component<Props, States> {
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

      layers.forEach(f => {
        if (f.type === 'group') {
          (f as __esri.GroupLayer).layers.forEach(layer => layer.visible = false);
        }
      });

      this.map.addMany(layers);
      // this.map.allLayers.forEach(f => {
      //   if (f.id !== CST_LAYER.BASE_MAP && f.id !== CST_LAYER.DIEM_SU_CO
      //     && f.type !== 'group') { f.visible = false; }
      // });
      let layerSuCo = this.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;

      if (layerSuCo) {
        // mặc định không hiển thị điểm hoàn thành
        layerSuCo.addDefinitionExpression(DEFAULT_DEF);
        layerSuCo.visible = true;
        layerSuCo = layerUtils.changeSymbolSuCo(layerSuCo) as any;
        layerSuCo.minScale = 0;
      }

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

export default TiepNhanSuCoPage;