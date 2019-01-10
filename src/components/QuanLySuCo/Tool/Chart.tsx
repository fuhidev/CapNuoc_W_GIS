//React
import * as React from 'react'
import { PieChart, Legend, Tooltip, Pie, Cell } from 'recharts';
import BaseComponent, { BaseProps } from '../../BaseComponent';
//Redux
import { connect } from 'react-redux';
import { AllModelReducer } from '../../../reducers';
import { loading, alertActions } from '../../../services/main/action';
import { timKiemTheoTinhTrang } from '../../../services/map/action';

import { ThongKe, COLORS } from '../../../services/map/SuCo/model';
import { LAYER as CST_LAYER } from '../../../constants/map'
import FeatureLayer from '../../../map-lib/layers/FeatureLayer';


type StateToProps = {
  datas: ThongKe[],
  view?: __esri.MapView | __esri.SceneView
};

type DispatchToProps = {
  loading: (isShow: boolean) => void,
  queryInfos: (code: string) => void,
  errorAlert: (message: string) => void
};

type Props = {
} & StateToProps & DispatchToProps & BaseProps;


class ChartComponent extends BaseComponent<Props, {}> {

  private async handleChartClick(event: any) {
    const code = event.code === undefined ? 0 : event.code;

    // lấy layer
    if (this.props.view) {
      const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
      if (layer) {
        this.props.queryInfos(code);
      }
      else {

      }
    }
  }

  render() {
    const { datas, className } = this.props;
    return <div>
      <PieChart className={className} width={300} height={400}>
        <Legend verticalAlign="bottom" height={36} align="center" />
        <Tooltip />
        <Pie
          onClick={this.handleChartClick.bind(this)}
          dataKey="value"
          // nameKey="name"
          // valueKey="value"
          data={datas}
          outerRadius={80}
          label >
          <Cell fill={COLORS[0]} />
          <Cell fill={COLORS[1]} />
        </Pie>
      </PieChart>
    </div>;
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  view: state.map.view,
  datas: state.mapSuCo.chartData
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  queryInfos: (code: string) => dispatch(timKiemTheoTinhTrang(code)),
  loading: (isShow: boolean) => {
    if (isShow) return dispatch(loading.loadingReady);
    else return dispatch(loading.loadingFinish);
  },
  errorAlert: (message: string) => dispatch(alertActions.error(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);