import * as React from 'react';
import { Paper, Tabs, Tab, LinearProgress } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import TieuThuTabComponent from './TieuThuTab';
import SuCoTabComponent from './SuCoTabComponent';
import ILITabComponent from './ILITabComponent';
import BaoCaoDMAComponent from './BaoCaoDMA';
import VanBuocComponent from './VanBuoc';
import DMA from '../../models/DMA';
import * as tonThatDMAApi from '../../apis/TonThatDMAApi';
type Props = {
  suCoLayer: __esri.FeatureLayer,
  dmaLayer: __esri.FeatureLayer,
  goTo: (d: any) => void,
  view?: __esri.MapView
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
    const { isLoading, dmas } = this.state;
    const { suCoLayer, dmaLayer } = this.props;
    return (
      <MuiThemeProvider>
        <div className="tool">
          {isLoading && <LinearProgress />}
          <Paper className="search-container">
            <div className="title">Tính tổn thất DMA</div>
            <Tabs>
              <Tab label="Tiêu thụ" >
                <TieuThuTabComponent dmas={dmas}
                  view={this.props.view}
                />
              </Tab>
              <Tab label="Sự cố" >
                <SuCoTabComponent dmas={dmas}
                  view={this.props.view}
                  suCoLayer={suCoLayer}
                  dmaLayer={dmaLayer}
                />
              </Tab>
              <Tab label="ILI" >
                <ILITabComponent />
              </Tab>
              <Tab label="Van bước" >
                <VanBuocComponent view={this.props.view} dmas={dmas} />
              </Tab>
              <Tab label="Báo cáo" >
                <BaoCaoDMAComponent view={this.props.view} dmas={dmas} />
              </Tab>
            </Tabs>
          </Paper>
        </div >
      </MuiThemeProvider >
    );
  }
}
export default ToolComponent;