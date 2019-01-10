// REACT
import * as React from 'react';

// APP
import MapComponent from '../components/QLTTDMA/MapComponent';
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
import MapView = require('esri/views/SceneView');
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
            view={view as any}
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
      ui: { components: [] },
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

      this.map.addMany(layers);

      // không add layer van, van bước
      // việc này hổ trợ cho chức năng đóng van bước
      let vanLayer = this.map.findLayerById(CST_LAYER.VAN) as __esri.FeatureLayer,
        vanBuocLayer = this.map.findLayerById(CST_LAYER.VAN_BUOC) as __esri.FeatureLayer,
        dhkhLayer = this.map.findLayerById(CST_LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer,
        ongNganhLayer = this.map.findLayerById(CST_LAYER.ONG_NGANH) as __esri.FeatureLayer,
        ongPhanPhoiLayer = this.map.findLayerById(CST_LAYER.ONG_PHAN_PHOI) as __esri.FeatureLayer,
        layerSuCo = this.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;

      if (layerSuCo) {
        layerSuCo = layerUtils.changeSymbolSuCo(layerSuCo);
        layerSuCo.definitionExpression = '1=2';
        layerSuCo.listMode = 'hide';
        layerSuCo.minScale = 0;
      }

      if (vanLayer) {
        vanLayer.definitionExpression = '1=2'; // không cho hiển thị
        vanLayer.listMode = 'hide';
        vanLayer.minScale = 0;
      }
      if (vanBuocLayer) {
        vanBuocLayer.definitionExpression = '1=2'; // không cho hiển thị
        vanBuocLayer.listMode = 'hide';
        vanBuocLayer.minScale = 0;
        vanBuocLayer.opacity = 0.8;
      }
      if (dhkhLayer) {
        dhkhLayer.definitionExpression = '1=2'; // không cho hiển thị
        dhkhLayer.listMode = 'hide';
        dhkhLayer.minScale = 0;
      }
      if (ongNganhLayer) {
        ongNganhLayer.definitionExpression = '1=2'; // không cho hiển thị
        ongNganhLayer.listMode = 'hide';
        ongNganhLayer.minScale = 0;
      }
      if (ongPhanPhoiLayer) {
        ongPhanPhoiLayer.definitionExpression = '1=2'; // không cho hiển thị
        ongPhanPhoiLayer.listMode = 'hide';
        ongPhanPhoiLayer.minScale = 0;
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