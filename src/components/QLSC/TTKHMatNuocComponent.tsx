import * as React from 'react';
import {
  Paper, SelectField, MenuItem,
  RaisedButton, Snackbar, Stepper, Step, StepLabel,
  LinearProgress,
  FlatButton,
} from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import ReactTable, { RowInfo } from 'react-table';

// APP
import * as tonThatAPI from '../../apis/TonThatDMAApi';
import * as suCoAPI from '../../apis/SuCoApi';
import DatePicker from '../../components/material-ui/DatePicker';
import DMA from '../../models/DMA';
import { ThongTinKhachHangMatNuoc } from '../../models/SuCo';
import { LAYER as CST_LAYER } from '../../constants/map';
import * as csv from '../../modules/csv';

// ESRI
import HighlightGraphic from '../../map-lib/support/HighlightGraphic';
type States = {
  dmaDatas: DMA[],
  results?: ThongTinKhachHangMatNuoc[],
  tuNgay?: Date,
  denNgay?: Date,
  dma?: string,
  snackbar: string;
  stepIndex: number;
  isLoadingResult: boolean;
  error?: string;
};

type Props = {
  view: __esri.MapView
};
class TTKHMatNuocComponent extends React.Component<Props, States> {
  private highlightGraphic: HighlightGraphic;
  constructor(props: Props) {
    super(props);
    this.state = {
      dmaDatas: [],
      snackbar: '',
      stepIndex: 0,
      isLoadingResult: false,
      tuNgay: new Date(),
      denNgay: new Date()
    };
  }
  render() {
    const {
      snackbar,
      stepIndex
    } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <div className="tool tool-customer" tabIndex={stepIndex}>
            <Paper>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Thông tin tìm kiếm</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Kết quả tìm kiếm</StepLabel>
                </Step>
              </Stepper>
              <div>{this.getStepContent()}</div>
              <div className="btn-group">
                <FlatButton
                  label="Quay lại"
                  disabled={stepIndex === 0}
                  onClick={(e: any) => this.setState({ stepIndex: 0 })}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label="Tìm kiếm"
                  disabled={stepIndex === 1}
                  primary={true}
                  onClick={(e: any) => {
                    if (stepIndex === 0) {
                      // lấy dma
                      const { dma, tuNgay, denNgay } = this.state;
                      if (!dma || !tuNgay || !denNgay) {
                        this.setState({
                          snackbar: 'Vui lòng nhập đầy đủ thông tin'
                        });
                        return;
                      }
                    }
                    this.setState({ stepIndex: 1 });
                    this.onSubmitClick();
                  }
                  }
                />
              </div>
            </Paper>
          </div >
          <Snackbar
            autoHideDuration={4000}
            open={snackbar.length > 0}
            message={snackbar}
            onRequestClose={e => this.setState({ snackbar: '' })}
          />
        </div>
      </MuiThemeProvider >
    );
  }

  private getStepContent() {
    const { dma, dmaDatas, tuNgay, denNgay, stepIndex,
      error, isLoadingResult, results } = this.state;

    if (stepIndex === 0) {
      return <div className="statistic">
        <div className="title">Khách hàng mất nước</div>
        <SelectField
          id="chonDMA"
          fullWidth={true}
          floatingLabelText="Chọn DMA"
          value={dma}
          onChange={(e: any, index: any, value: any) => {
            this.setState({ dma: value });
          }}
        >
          <MenuItem key={'dmadefault'} primaryText="Chọn DMA" />
          {
            dmaDatas.map(m => <MenuItem key={'dma' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
          }
        </SelectField>
        <DatePicker
          fullWidth={true}
          floatingLabelText="Từ"
          value={tuNgay}
          onChange={(event: any, value: any) => this.handleChange('tuNgay', value)}
        />
        <DatePicker
          fullWidth={true}
          floatingLabelText="Đến"
          value={denNgay}
          onChange={(event: any, value: any) => this.handleChange('denNgay', value)}
        />
      </div>;
    } else if (stepIndex === 1) {
      return <Paper className="result-container">
        {isLoadingResult && <LinearProgress />}
        {error && <div className="error-message">{error}</div>}
        {results &&
          <div>
            <div style={{ textAlign: 'right' }}>
              <a href={this.jSONToCSVConvertor(results, 'khachhangmatdien')}
                download="Danh sách khách hàng mất nước.xls">
                Tải xuống
            </a>
            </div>
            <ReactTable
              data={results}
              columns={[
                {
                  Header: 'Danh bộ',
                  accessor: 'DBDONGHONUOC'
                },
                {
                  Header: 'Số nhà',
                  accessor: 'SONHA'
                },
                {
                  Header: 'Phường',
                  accessor: 'MAPHUONG'
                },
                {
                  Header: 'Quận',
                  accessor: 'MAQUAN'
                },
                {
                  Header: 'DMA',
                  accessor: 'TENDMA'
                },
                {
                  Header: 'Ngày cập nhật',
                  accessor: 'NGAYCAPNHAT'
                },
                {
                  Header: 'Từ ngày',
                  accessor: 'TuNgay'
                },
                {
                  Header: 'Đến ngày',
                  accessor: 'DenNgay'
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
              getTrProps={(state: any, rowInfo: any) => {
                return {
                  onClick: () => this.onRowClick(rowInfo)
                };
              }}
            />
          </div>
        }

      </Paper>;
    } else { return <div className="error-message">Có lỗi xảy ra</div>; }
  }

  componentDidMount() {
    tonThatAPI.layLoggerDMA()
      .then((dmaDatas) => {
        this.setState({ dmaDatas });
      });
  }

  private async onSubmitClick() {
    // Xóa highlight đồng hồ nếu có
    if (this.highlightGraphic) {
      this.highlightGraphic.clear();
    }

    // lấy dma
    const { dma, tuNgay, denNgay } = this.state;
    if (dma && tuNgay && denNgay) {
      try {
        this.setState({
          isLoadingResult: true,
          results: []
        });
        const results = await suCoAPI.thongTinKhachHangMatNuoc(dma, tuNgay.getTime(), denNgay.getTime());
        this.setState({
          results
        });
        this.goTo(results);
      } catch (error) {
        this.setState({
          error: 'Có lỗi xảy ra trong quá trình thực hiện',
        });
      }
      finally {
        this.setState({
          isLoadingResult: false
        });
      }

    } else {
      this.setState({
        snackbar: 'Vui lòng nhập đầy đủ thông tin'
      });
    }
  }

  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private async onRowClick(rowInfo: RowInfo) {
    const { DBDONGHONUOC } = rowInfo.row;
    const view = this.props.view;
    if (view) {
      // layer đồng hồ khách hàng
      const layer = view.map.findLayerById(CST_LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer;

      // kiểm tra
      if (layer && DBDONGHONUOC) {
        // lấy mã danh bộ
        try {
          if (!layer) { return false; }
          const resultExtent = await layer.queryFeatures({
            where: `DBDONGHONUOC = '${DBDONGHONUOC}'`,
            outFields: ['*'],
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
    } else {
      this.setState({
        snackbar: 'Có lỗi xảy ra, vui lòng thử lại'
      });
    }
  }

  /**
   * Highlight khách hàng mất nước
   */
  private async goTo(results: ThongTinKhachHangMatNuoc[]) {
    // nếu chưa có thì tạo
    const view = this.props.view;
    if (!this.highlightGraphic) {
      this.highlightGraphic = new HighlightGraphic(view);
    }

    const layerDHKH = view.map.findLayerById(CST_LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer;
    if (layerDHKH && results && results.length > 0) {
      const danhSachDanhBo = results.map(m => `'${m.DBDONGHONUOC}'`);

      const where = `DBDONGHONUOC IN (${danhSachDanhBo.join(', ')})`;

      // truy vấn
      const resultsGIS = await layerDHKH.queryFeatures({
        returnGeometry: true, outSpatialReference: view.spatialReference,
        where
      });

      // hiển thị tất cả các kết quả lên màn hình
      this.highlightGraphic.addAll(resultsGIS.features);
      view.goTo(resultsGIS.features);
    }
  }

  private jSONToCSVConvertor(datas: Array<any>, title: string) {
    const columns = {
      OBJECTID: 'Number',
      DBDONGHONUOC: 'String',
      TENTHUEBAO: 'String',
      SONHA: 'String',
      MADUONG: 'String',
      MAPHUONG: 'String',
      MAQUAN: 'String',
      CODONGHO: 'String',
      SDTPhanAnh: 'String',
      TENDMA: 'String',
      TENDUONG: 'String',
      NGAYCAPNHAT: 'String'
    };

    return csv.jSONToCSVConvertor(datas, columns, title);
  }
}
export default TTKHMatNuocComponent;