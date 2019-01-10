import * as React from 'react';
import { Paper, Tabs, Tab, LinearProgress } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import GISTabComponent from './GISTabComponent';
import SanLuongTabComponent from './SanLuongTabComponent';
import DMA from '../../models/DMA';
import * as tonThatDMAApi from '../../apis/TonThatDMAApi';
import * as constant from '../../constants/map';
type Props = {
  view: __esri.MapView
};
type States = {
  dmas: DMA[],
  isLoading: boolean;
};
class ToolComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dmas: [],
      isLoading: true
    };
  }
  async componentDidMount() {
    tonThatDMAApi.layLoggerDMA()
      .then((dmaDatas) => {
        this.setState({ dmas: dmaDatas, isLoading: false });
      });
  }
  render() {
    const { isLoading } = this.state;
    const { view } = this.props;
    const dhkhLayer = view.map.findLayerById(constant.LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer;
    return (
      <MuiThemeProvider>
        <div className="tool">
          {isLoading && <LinearProgress />}
          <Paper className="search-container">
            <div className="title">Sản lượng khách hàng</div>
            <Tabs>
              <Tab label="GIS" >
                <GISTabComponent
                  dhkhLayer={dhkhLayer}
                  onFocusDHKH={this.onFocusDHKH.bind(this)}
                />
              </Tab>
              <Tab label="Sản lượng" >
                <SanLuongTabComponent
                  onFocusDHKH={this.onFocusDHKH.bind(this)}
                />
              </Tab>
            </Tabs>
          </Paper>
        </div >
      </MuiThemeProvider >
    );
  }

  private async onFocusDHKH(danhBo: string): Promise<boolean> {
    // truy vấn GIS
    try {
      const view = this.props.view;
      const layer = view.map.findLayerById(constant.LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer;
      if (!layer) { return false; }
      const resultExtent = await layer.queryFeatures({
        where: `DBDONGHONUOC = '${danhBo}'`,
        outFields: [],
        returnGeometry: true,
        outSpatialReference: view.spatialReference
      });

      if (resultExtent && resultExtent.features.length > 0) {
        view.popup.open({
          features: resultExtent.features,
          updateLocationEnabled: true
        });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
export default ToolComponent;