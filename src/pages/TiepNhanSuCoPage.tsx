// REACT
import * as React from 'react';

// APP
import MapComponent from '../components/TiepNhanSuCo/MapComponent';
import FormComponent from '../components/TiepNhanSuCo/FormComponent';
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
import { Route } from '../modules/routers';
import * as moment from '../modules/moment';
import FeatureLayer from '../map-lib/layers/FeatureLayer';

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
        <div className={this.props.id}>
          <div className="form-container">
            {view &&
              <FormComponent
                view={view}
              />
            }
          </div>
          <MapComponent
            layerInfos={layerInfos}
            loadMapDiv={this.loadMapDiv.bind(this)}
            view={view}
            isLoading={isLoading}
            className="map-container"
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
        this.map.findLayerById(CST_LAYER.DIEM_SU_CO)
          .when(() => this.hienDangTai(false));
        this.setState({
          view, layerInfos
        });
      });
  }

  private initFL(layerInfos: LayerInfo[]) {
    try {
      // lấy dữ liệu nền
      const layers = layerUtils.assignLayer(layerInfos, this.props.id);

      this.map.addMany(layers.filter(f => f.type !== 'feature'));

      let layerSuCo = this.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer,
        dmaLayer = this.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;
      if (layerSuCo) {
        let where = [];
        const s = moment.formatyyyymmdd(new Date(), '-');
        where.push(`TGPhanAnh >= date'${s} 00:00:00'`);
        where.push(`TGPhanAnh <= date'${s} 23:59:59'`);
        layerSuCo.addDefinitionExpression(where.join(' AND '));
        layerSuCo = layerUtils.changeSymbolSuCo(layerSuCo) as any;
        layerSuCo.minScale = 0;
      }
      if (dmaLayer) {
        dmaLayer.visible = false;
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