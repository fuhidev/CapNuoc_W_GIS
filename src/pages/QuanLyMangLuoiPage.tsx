// REACT
import * as React from 'react';
import BasePage from './BasePage';

//Redux
import { initViewDiv } from '../actions/index'

// APP
import MapComponent from '../components/QuanLyMangLuoi/MapComponent';
import LayerInfo from '../models/LayerInfo';
import layerUtils from '../map-lib/support/LayerHelper';

// ESRI
import { connect } from 'react-redux';
import { AllModelReducer } from '../reducers';

type States = {
};

type StateToProps = {
  layerInfos?: LayerInfo[],
  view?: __esri.MapView | __esri.SceneView
}

type DispatchToProps = {
  initViewDiv: (div: HTMLDivElement) => void
};

type Props = {

} & DispatchToProps & StateToProps;

class QLMLPage extends BasePage<Props, States> {
  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.layerInfos !== props.layerInfos && props.layerInfos) {
      this.initFL(props.layerInfos);
    }
  }

  render() {
      return (
        <div className={this.props.id}>
          <MapComponent
            loadMapDiv={this.loadMapDiv.bind(this)}
            layerInfos={this.props.layerInfos}
            view={this.props.view}
          />
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

      if (this.props.view)
        this.props.view.map.addMany(layers);

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


export default connect(mapStateToProps, { initViewDiv })(QLMLPage);