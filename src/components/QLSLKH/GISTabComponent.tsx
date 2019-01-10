import * as React from 'react';
import {
  SelectField, Paper,
  TextField, RaisedButton, LinearProgress, MenuItem,
  Table, TableRowColumn, TableRow, TableHeader, TableBody, TableHeaderColumn,
  Stepper, Step, StepLabel, FlatButton, Snackbar
} from 'material-ui';
interface Props {
  dhkhLayer: __esri.FeatureLayer;
  onFocusDHKH: (danhBo: string) => boolean;
}

interface States {
  loaiKhachHang?: number;
  coDongHo?: number;
  operator: string;
  danhBoKH?: string;
  loaiKhachHangDatas: __esri.CodedValueDomainCodedValues[];
  coDongHoDatas: __esri.CodedValueDomainCodedValues[];
  result?: Array<{
    DBDONGHONUOC: string;
    TENTHUEBAO: string;
  }>;
  isLoadingResult: boolean;
  error?: string;
  operatorDatas: string[];
  stepIndex: number;
  snackbar: {
    message: string; isOpen: boolean
  };
}

class GISTabComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingResult: false,
      coDongHoDatas: [],
      loaiKhachHangDatas: [],
      operator: '=',
      operatorDatas: ['=', '>', '<', '>=', '<='],
      stepIndex: 0,
      snackbar: {
        isOpen: false, message: ''
      }
    };
  }
  async componentDidMount() {
    // lấy domain cỡ đồng hồ
    const { dhkhLayer } = this.props;
    dhkhLayer.when((_: any) => {
      const domainCDH = dhkhLayer.getFieldDomain('CODONGHO');
      if (domainCDH) {
        const { codedValues } = (domainCDH as __esri.CodedValueDomain);
        this.setState({ coDongHoDatas: codedValues });
      }

      const domainLKH = dhkhLayer.getFieldDomain('LOAIKHACHHANG');
      if (domainLKH) {
        const { codedValues } = (domainLKH as __esri.CodedValueDomain);
        this.setState({ loaiKhachHangDatas: codedValues });
      }
    });
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
      const { dhkhLayer } = this.props;
      const { coDongHo, operator, danhBoKH, loaiKhachHang } = this.state;
      var where = [];
      if (danhBoKH) { where.push(`DBDONGHONUOC = '${danhBoKH}'`); }
      if (loaiKhachHang) { where.push(`LOAIKHACHHANG = ${loaiKhachHang}`); }
      if (coDongHo) { where.push(`CODONGHO ${operator || '='} ${coDongHo}`); }

      // nếu khôn tìm thấy điều kiện thì xuất lỗi
      if (where.length === 0) {
        this.setState({
          result: undefined, error: 'Chọn điều kiện để lọc',
          isLoadingResult: false
        });
        return;
      }

      where.push('DBDONGHONUOC IS NOT NULL');

      const results = await dhkhLayer.queryFeatures({
        where: where.join(' AND '),
        returnGeometry: false,
        outFields: ['DBDONGHONUOC,TENTHUEBAO'],
        returnDistinctValues: true
      });
      this.setState({
        error: undefined,
        result: results.features.map(m => m.attributes)
      });
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
    const { result, isLoadingResult, error, loaiKhachHang,
      loaiKhachHangDatas, operator, operatorDatas,
      coDongHo, coDongHoDatas,
      danhBoKH, stepIndex } = this.state;

    if (stepIndex === 0) {
      return <div>
        <SelectField
          fullWidth={true}
          floatingLabelText="Chọn loại khách hàng"
          value={loaiKhachHang}
          onChange={(e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) =>
            this.handleChange('loaiKhachHang', menuItemValue)}
        >
          <MenuItem key={'lkhdefault'} value={undefined} primaryText="Chọn loại khách hàng" />
          {
            loaiKhachHangDatas &&
            loaiKhachHangDatas.map(m => <MenuItem key={'lkh' + m.code} value={m.code} primaryText={m.name} />)
          }
        </SelectField>
        <div>
          <SelectField
            style={{ width: 100 }}
            floatingLabelText="Quy tắc"
            value={operator}
            onChange={(e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) =>
              this.handleChange('operator', menuItemValue)}
          >
            {
              operatorDatas &&
              operatorDatas.map(m => <MenuItem key={'operator' + m} value={m} primaryText={m} />)
            }
          </SelectField>
          <SelectField
            style={{ width: 'calc(100% - 100px)' }}
            floatingLabelText="Chọn cỡ đồng hồ"
            value={coDongHo}
            onChange={(e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) =>
              this.handleChange('coDongHo', menuItemValue)}
          >
            <MenuItem key={'cdhdefault'} value={undefined} primaryText="Chọn cỡ đồng hồ" />
            {

              coDongHoDatas &&
              coDongHoDatas.map(m => <MenuItem key={'cdh' + m.code} value={m.code} primaryText={m.name} />)
            }
          </SelectField>
        </div>
        <TextField
          fullWidth={true}
          floatingLabelText="Danh bộ khách hàng"
          hintText="Tìm theo danh bộ"
          value={danhBoKH}
          onChange={(e: any, value: string) => this.handleChange('danhBoKH', value)}
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
                  <TableHeaderColumn>Tên khách hàng</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover={true}>
                {
                  result.map(
                    m =>
                      <TableRow key={'row' + m.DBDONGHONUOC}>
                        <TableRowColumn key={'row_1_' + m.DBDONGHONUOC} >{m.DBDONGHONUOC}</TableRowColumn>
                        <TableRowColumn key={'row_2_' + m.DBDONGHONUOC}>{m.TENTHUEBAO}</TableRowColumn>
                      </TableRow>
                  )
                }

              </TableBody>
              {/* <TableFooter>
              Tổng số lượng: {result.length}
            </TableFooter> */}
            </Table>
          </div>
        }

      </Paper>;
    } else { return <div className="error-message">Có lỗi xảy ra</div>; }
  }

  private async onRowClick(selectedRows: number[] | 'all') {
    const { result } = this.state;
    const layer = this.props.dhkhLayer;

    const selectIndex = selectedRows[0];

    // kiểm tra
    if (layer && selectIndex !== undefined && result && result[selectIndex]) {
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

      // goTo graphic
    }
  }
}

export default GISTabComponent;