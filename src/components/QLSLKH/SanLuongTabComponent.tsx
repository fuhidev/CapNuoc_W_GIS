import * as React from 'react';
import {
  SelectField, Paper,
  TextField, RaisedButton, LinearProgress, MenuItem,
  Table, TableRowColumn, TableRow, TableHeader, TableBody, TableHeaderColumn,
  Stepper, Step, StepLabel, FlatButton, Snackbar
} from 'material-ui';

import * as api from '../../apis/QuanLySanLuongKHApi';

interface Props {
  onFocusDHKH: (danhBo: string) => boolean;
}

interface States {
  loaiTruyVan: number;
  ky: number;
  nam: number;
  limit: number;
  namDatas: number[];
  kyDatas: number[];
  tieuThuTu?: number;
  tieuThuDen?: number;
  chiSoTu?: number;
  chiSoDen?: number;
  giaBieuTu?: number;
  giaBieuDen?: number;
  isLoadingResult: boolean;
  result?: Array<{ DANHBA: string, TIEUTHU: string }>;
  error?: string;
  stepIndex: number;
  snackbar: {
    message: string; isOpen: boolean
  };
}

class SanLuongTabComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);

    let namDatas = [], kyDatas = [];

    for (let n = new Date().getFullYear(); n > 2000; n--) {
      namDatas.push(n);
    }

    for (let n = 1; n <= 12; n++) {
      kyDatas.push(n);
    }

    this.state = {
      tieuThuTu: 0,
      chiSoTu: 0,
      loaiTruyVan: 1,
      limit: 100,
      ky: 1,
      nam: new Date().getFullYear(),
      namDatas,
      kyDatas,
      isLoadingResult: false,
      stepIndex: 0,
      snackbar: {
        isOpen: false, message: ''
      }
    };
  }
  render() {
    const { stepIndex, snackbar } = this.state;
    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Thông tin tìm kiếm</StepLabel>
          </Step>
          <Step>
            <StepLabel>Kết quả tìm kiếm</StepLabel>
          </Step>
        </Stepper>
        <div >
          <div>{this.getStepContent()}</div>
          <div style={{ marginTop: 12 }}>
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
                this.setState({ stepIndex: 1 });
                this.handleSubmitClick();
              }}
            />
          </div>
        </div>
        <Snackbar
          open={snackbar.isOpen}
          message={snackbar.message}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ snackbar: { isOpen: false, message: '' } })}
        />
      </div>
    );
  }

  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private async handleSubmitClick() {
    this.setState({
      isLoadingResult: true,
      result: undefined,
      error: undefined
    });
    try {
      const { loaiTruyVan, limit, ky, nam,
        tieuThuTu, tieuThuDen, chiSoTu, chiSoDen, giaBieuTu, giaBieuDen
      } = this.state;
      if (loaiTruyVan === 1) {
        const result = await api.xepHangSanLuongTheoKy({
          gioiHanSoLuong: limit, ky: ky, nam: nam
        });

        this.setState({
          result,
          error: undefined
        });

      } else if (loaiTruyVan === 2) {
        const result = await api.laySanLuong({
          gioiHanSoLuong: limit, ky: ky, nam: nam,
          tieuThuTu, tieuThuDen, chiSoTu, chiSoDen, giaBieuTu, giaBieuDen,
        });

        this.setState({
          result,
          error: undefined
        });
      } else {
        throw 'Không xác định loại truy vấn';
      }

    } catch (error) {
      this.setState({
        error: error.Message ? error.Message : error
      });
    }
    finally {
      this.setState({
        isLoadingResult: false
      });
    }
  }

  private getStepContent() {
    const { result, isLoadingResult, error,
      loaiTruyVan, nam, ky, namDatas, kyDatas,
      limit,
      tieuThuTu, tieuThuDen, chiSoTu, chiSoDen, giaBieuTu, giaBieuDen,
      stepIndex } = this.state;

    if (stepIndex === 0) {
      return <div>
        <SelectField
          fullWidth={true}
          floatingLabelText="Loại truy vấn"
          value={loaiTruyVan}
          onChange={(e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) =>
            this.handleChange('loaiTruyVan', menuItemValue)}
        >
          <MenuItem value={1} primaryText="Top khách hàng có sản lượng cao nhất kỳ" />
          <MenuItem value={2} primaryText="Khách hàng trong khoảng" />
        </SelectField>
        <div>
          <SelectField
            style={{ width: '50%' }}
            floatingLabelText="Năm"
            value={nam}
            onChange={(e: any, index: any, value: any) => this.handleChange('nam', value)}
          >
            {
              namDatas.map(m => <MenuItem key={'nam' + m} value={m} primaryText={m} />)
            }
          </SelectField>
          <SelectField
            style={{ width: '50%' }}
            floatingLabelText="Kỳ"
            value={ky}
            onChange={(e: any, index: any, value: any) => this.handleChange('ky', value)}
          >
            {
              kyDatas.map(m => <MenuItem key={'ky' + m} value={m} primaryText={m} />)
            }
          </SelectField>
        </div>
        {loaiTruyVan === 2 &&
          <div>
            <div>
              <TextField
                style={{ width: '50%' }}
                floatingLabelText="Tiêu thụ từ"
                value={tieuThuTu}
                onChange={(e: any, value: string) => this.handleChange('tieuThuTu', value)}
              />
              <TextField
                style={{ width: '50%' }}
                floatingLabelText="Tiêu thụ đến"
                value={tieuThuDen}
                onChange={(e: any, value: string) => this.handleChange('tieuThuDen', value)}
              />
            </div>
            <div>
              <TextField
                style={{ width: '50%' }}
                floatingLabelText="Chỉ số từ"
                value={chiSoTu}
                onChange={(e: any, value: string) => this.handleChange('chiSoTu', value)}
              />
              <TextField
                style={{ width: '50%' }}
                floatingLabelText="Chỉ số đến"
                value={chiSoDen}
                onChange={(e: any, value: string) => this.handleChange('chiSoDen', value)}
              />
            </div>
            <div>
              <TextField
                style={{ width: '50%' }}
                floatingLabelText="Giá biểu từ"
                value={giaBieuTu}
                onChange={(e: any, value: string) => this.handleChange('giaBieuTu', value)}
              />
              <TextField
                style={{ width: '50%' }}
                floatingLabelText="Giá biểu đến"
                value={giaBieuDen}
                onChange={(e: any, value: string) => this.handleChange('giaBieuDen', value)}
              />
            </div>
          </div>
        }
        <TextField
          fullWidth={true}
          floatingLabelText="Số lượng khách hàng được liệt kê"
          value={limit}
          onChange={(e: any, value: string) => this.handleChange('limit', value)}
        />
      </div>;
    } else if (stepIndex === 1) {
      return <Paper className="result-container">
        {isLoadingResult && <LinearProgress />}
        {error && <div className="error-message">{error}</div>}
        {result &&
          <div>
            <Table
              height="270px"
              selectable={true}
              multiSelectable={false}
              allRowsSelected={false}
              onRowSelection={this.onRowClick.bind(this)}
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Danh bộ</TableHeaderColumn>
                  <TableHeaderColumn>Tiêu thụ</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover={true}>
                {
                  result.map(
                    m =>
                      <TableRow key={'row' + m.DANHBA}>
                        <TableRowColumn key={'row_1_' + m.DANHBA} >{m.DANHBA}</TableRowColumn>
                        <TableRowColumn key={'row_2_' + m.DANHBA}>{m.TIEUTHU}</TableRowColumn>
                      </TableRow>
                  )
                }

              </TableBody>
            </Table>
          </div>
        }

      </Paper>;
    } else { return <div className="error-message">Có lỗi xảy ra</div>; }
  }

  private async onRowClick(selectedRows: number[] | 'all') {
    const { result } = this.state;

    const selectIndex = selectedRows[0];

    // kiểm tra
    if (selectIndex !== undefined && result && result[selectIndex]) {
      // lấy mã danh bộ
      const DBDONGHONUOC = result[selectIndex].DBDONGHONUOC;
      if (!this.props.onFocusDHKH(DBDONGHONUOC)) {
        this.setState({
          snackbar: {
            isOpen: true,
            message: 'Không thể truy vấn dữ liệu GIS của danh bộ ' + DBDONGHONUOC
          }
        });
      }
    }
  }
}

export default SanLuongTabComponent;