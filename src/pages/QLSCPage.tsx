// REACT
import * as React from 'react';
import BasePage from './BasePage';

// Redux
import { getLayerInfos, initViewDiv } from '../actions/index';

// APP
import MapComponent from '../components/QuanLySuCo/MapComponent';
import InfoTableComponent from '../components/QuanLySuCo/InfoTableComponent';
import ToolComponent from '../components/QuanLySuCo/ToolComponent';
import AddingComponent from '../components/QuanLySuCo/Widget/AddingComponent';
import LayerInfo from '../models/LayerInfo';
import {
  LAYER as CST_LAYER
} from '../constants/map';
import layerUtils from '../map-lib/support/LayerHelper';
// ESRI
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers';
import { alertActions } from '../services/main/action';
import { emptyInfos, setLayer } from '../services/map/action';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import FeatureLayer from '../map-lib/layers/FeatureLayer';
import SplitterLayout from 'react-splitter-layout';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  toolContainer: {
    width: '100%',
    height: '100%'
  },
  mapContainer: {
    flexGrow: 1,
    height: '100%',
    '& .map-view-container': {
      flexGrow: 1,
      height: 'fit-content'
    },
    '& .info-container': {
    }
  }
});

type States = {
};

type StateToProps = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView,
  isShowInfoTable: boolean
};

type DispatchToProps = {
  getLayerInfos: () => void,
  initViewDiv: (div: HTMLDivElement) => void,
  alertError: (message: string) => void,
  closeInfoWindow: () => void,
  setLayer: (layer: FeatureLayer) => void

};

type Props = {

}
  & DispatchToProps
  & StateToProps
  & WithStyles<typeof styles>;

class QLSCPage extends BasePage<Props, States> {
  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.layerInfos !== props.layerInfos && props.layerInfos) {
      this.initFL(props.layerInfos);
    }
  }

  render() {
    const { isShowInfoTable, classes } = this.props;
    
    return (
      <div className={classes.root}>
        <SplitterLayout primaryIndex={1} secondaryInitialSize={400}>
          <div className={classes.toolContainer}>
            <ToolComponent />
          </div>
          <div className={classes.mapContainer}>
           
            <SplitterLayout
              primaryIndex={0}
              secondaryInitialSize={200}
              vertical
            >
              <MapComponent
                className="map-view-container"
                loadMapDiv={this.loadMapDiv.bind(this)}
                layerInfos={this.props.layerInfos}
                view={this.props.view}
              />
              {
                isShowInfoTable
                && <div className="info-container">
                  <InfoTableComponent />
                </div>
              }
            </SplitterLayout>
          </div>
        </SplitterLayout>
      </div>
    );
  }

  private loadMapDiv(div: HTMLDivElement) {
    this.props.initViewDiv(div);
  }

  private initFL(layerInfos: LayerInfo[]) {
    try {
      const layers = layerUtils.assignLayer(layerInfos, this.props.id);

      if (this.props.view) {
        this.props.view.map.addMany(layers);
        // set sự cố
        {
          const layerSuCo = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
          layerSuCo.renderer = layerUtils.getSuCoRenderer();
          layerSuCo.minScale = 0;
          this.props.setLayer(layerSuCo);
        }
      }
      return true;
    } catch (error) {
      // lỗi
      return false;
    }
  }

}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  layerInfos: state.map.layerInfos,
  view: state.map.view,
  isShowInfoTable: state.mapSuCo.infoDatas !== undefined,
});

export default connect(
  mapStateToProps,
  { getLayerInfos, initViewDiv, alertError: alertActions.error, closeInfoWindow: emptyInfos, setLayer })
  (withStyles(styles)(QLSCPage));