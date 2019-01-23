// REACT
import * as React from 'react';
import BasePage from './BasePage';

// Redux
import { initViewDiv } from '../actions/index';

// Component
import MapComponent from '../components/QuanLyMangLuoi/MapComponent';
import ToolComponent from '../components/QuanLyMangLuoi/ToolComponent';

import LayerInfo from '../models/LayerInfo';
import layerUtils from '../map-lib/support/LayerHelper';

// ESRI
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers';
import { createStyles, WithStyles, withStyles, LinearProgress } from '@material-ui/core';
import SplitterLayout from 'react-splitter-layout';

const styles = createStyles({
  root: { height: '100%', width: '100%' }
});

type States = {
  isLoadLayers: boolean // kiểm tra đã tải lớp dữ liệu?
};

type StateToProps = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView
};

type DispatchToProps = {
  initViewDiv: (div: HTMLDivElement) => void
};

type Props = {

} & DispatchToProps & StateToProps & WithStyles<typeof styles>;

class QLMLPage extends BasePage<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { isLoadLayers: false };
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.layerInfos !== props.layerInfos && props.layerInfos) {
      this.initFL(props.layerInfos);
    }
  }

  render() {
    const { classes, view, layerInfos } = this.props;
    const { isLoadLayers } = this.state;

    return (
      <div className={classes.root}>
        <SplitterLayout primaryIndex={0} secondaryInitialSize={300} 	>
          <MapComponent
            loadMapDiv={this.loadMapDiv.bind(this)}
            layerInfos={layerInfos}
            view={view}
          />
          {!isLoadLayers && <LinearProgress />}
          {
            isLoadLayers &&
            <ToolComponent view={view} />
          }

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

      // mặc định không hiển thị trừ dữ liệu nền

      if (this.props.view) { this.props.view.map.addMany(layers); }
      this.setState({ isLoadLayers: true });
      return true;
    } catch (error) {
      // lỗi
      return false;
    }
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  layerInfos: state.map.layerInfos,
  view: state.map.view
});

export default connect(mapStateToProps, { initViewDiv })(withStyles(styles)(QLMLPage));