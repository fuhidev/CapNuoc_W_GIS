// REACT
import * as React from 'react';
import { SelectField, MenuItem, Divider, Paper, RaisedButton, LinearProgress, Toggle } from 'material-ui';

// APP
import DatePicker from '../material-ui/DatePicker';
import DMA, { SuCoResult, SuCoTheoDMA } from '../../models/DMA';
import * as api from '../../apis/TonThatDMAApi';
import { LAYER as CST_LAYER } from '../../constants/map';

// ESRI
import Query = require('esri/tasks/support/Query');
import StatisticDefinition = require('esri/tasks/support/StatisticDefinition');

interface Props {
  dmas: DMA[];
  suCoLayer: __esri.FeatureLayer;
  dmaLayer: __esri.FeatureLayer;
  view?: __esri.MapView;
}

interface States {
  dma?: string;
  fromDate: any;
  toDate: any;
  result?: SuCoResult;
  resultDSSC?: SuCoTheoDMA[];
  isLoadingResult?: boolean;
  error?: string;
  isCheDoDanhSach: boolean;
}

class SuCoTabComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingResult: false,
      fromDate: new Date(),
      toDate: new Date(),
      isCheDoDanhSach: false
    };
  }
  render() {
    const { dmas } = this.props;
    const { isCheDoDanhSach, resultDSSC, dma, fromDate, toDate, result, isLoadingResult, error } = this.state;
    return (
      <div>
        <Toggle
          labelPosition="right"
          toggled={isCheDoDanhSach}
          label="Danh sách sự cố theo DMA"
          onToggle={(e: React.MouseEvent<{}>, isInputChecked: boolean) =>
            this.setState({ isCheDoDanhSach: isInputChecked })}
        />
        {
          !isCheDoDanhSach &&
          <SelectField
            floatingLabelText="DMA"
            hintText="Chọn DMA"
            fullWidth={true}
            value={dma}
            onChange={(e: any, index: any, value: any) => {
              this.goToDMA(value);
              this.handleChange('dma', value);
            }}
          >
            {
              dmas.map(m => <MenuItem key={'suco' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
            }
          </SelectField>
        }
        <DatePicker
          fullWidth={true}
          floatingLabelText="Từ"
          value={fromDate}
          onChange={(event: any, value: any) => this.handleChange('fromDate', value)}
        />
        <DatePicker
          fullWidth={true}
          floatingLabelText="Đến"
          value={toDate}
          onChange={(event: any, value: any) => this.handleChange('toDate', value)}
        />
        <div>
          <RaisedButton
            fullWidth={true}
            primary={true} label="Tính toán"
            onClick={this.handleSubmitClick.bind(this)}
          />
        </div>
        <Divider />
        <div className="result-container">
          {isLoadingResult && <LinearProgress />}
          {error && <div className="error-message">{error}</div>}
          {result && !isCheDoDanhSach &&
            <Paper>
              <div className="title">Kết quả</div>
              <div style={{ textAlign: 'center' }}><i>(Số liệu đã làm tròn 3 chữ số)</i></div>
              <div>
                <div><i>Tổng sản lượng DMA:</i><strong> {result.SanLuongDMA} m3</strong></div>
                <div><i>Tổng điểm sự cố:</i><strong> {result.TongSuCo || 0}</strong></div>
                <table className="slsc">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Giá trị</th>
                      <th>Tỉ lệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Điểm bể</td>
                      <td>{result.TTKQ || 0} m3</td>
                      <td>{this.giaTriTonThat(result.TTKQ)} %</td>
                    </tr>
                    <tr>
                      <td>Sửa bể</td>
                      <td>{result.TTCQ || 0} m3</td>
                      <td>{this.giaTriTonThat(result.TTCQ)} %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Paper>
          }
          {
            resultDSSC && isCheDoDanhSach &&
            <Paper>
              <div className="title">Danh sách sự cố theo DMA</div>
              <table className="slsc">
                <thead>
                  <tr>
                    <th>DMA</th>
                    <th>ID</th>
                    <th>Điểm bể</th>
                    <th>Sửa bể</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resultDSSC.map(m =>
                      <tr key={m.IDSuCo + '' + m.TenDMA} onClick={() => this.onClickDSSCRow(m)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{m.TenDMA}</td>
                        <td>{m.IDSuCo}</td>
                        <td>{m.DiemBe}</td>
                        <td>{m.SuaBe}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <div className="title">Thống kê sự cố theo DMA</div>
              <table className="slsc">
                <thead>
                  <tr>
                    <th>DMA</th>
                    <th>Số lượng</th>
                    <th>Tổng điểm bể</th>
                    <th>Tổng sửa bể</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.thongKeSCTheoDMA(resultDSSC).map(m =>
                      <tr key={m.TenDMA} onClick={() => this.onClickTKDSSCRow(m.TenDMA)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{m.TenDMA}</td>
                        <td>{m.SoLuong}</td>
                        <td>{m.DiemBe}</td>
                        <td>{m.SuaBe}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </Paper>
          }
        </div>
      </div>
    );
  }

  /**
   * Sự kiện nhấn vào dòng
   * @param model 
   */
  private async onClickDSSCRow(model: SuCoTheoDMA) {
    const { view, suCoLayer } = this.props;
    if (view && suCoLayer) {
      // lấy id
      const id = model.IDSuCo;
      // truy vấn
      const results = await suCoLayer.queryFeatures({
        where: `IDSuCo = '${id}'`, returnGeometry: true, outSpatialReference: view.spatialReference
      });
      // goto
      view.goTo({
        target: results.features,
        zoom: 18
      });
    }
  }
  /**
   * Sự kiện nhấn vào dòng
   * @param model 
   */
  private async onClickTKDSSCRow(tenDMA: string) {
    const { view, dmaLayer } = this.props;
    if (view && dmaLayer && tenDMA) {
      // lấy id
      // truy vấn
      const results = await dmaLayer.queryFeatures({
        where: `TenDMA = '${tenDMA}'`, returnGeometry: true, outSpatialReference: view.spatialReference
      });
      // goto
      view.goTo(results.features);
    }
  }

  /**
   * Thống kê số lượng sự cố theo DMa
   */
  private thongKeSCTheoDMA(datas: SuCoTheoDMA[]) {
    // tạo mảng dma
    var results: Array<{ TenDMA: string, SoLuong: number, DiemBe: number, SuaBe: number }> = [];

    datas.forEach(f => {
      var d = results.find(f1 => f1.TenDMA === f.TenDMA);
      // nếu chưa có thì gán
      if (!d) {
        results.push({ TenDMA: f.TenDMA, DiemBe: f.DiemBe || 0, SuaBe: f.SuaBe || 0, SoLuong: 1 });
      } else {
        // tăng giá trị
        d.DiemBe += f.DiemBe; d.SuaBe += f.SuaBe; d.SoLuong++;
      }
    });
    return results;
  }

  private async goToDMA(maDMA: string) {
    const view = this.props.view;
    if (view) {
      const layer = view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;
      if (layer) {
        const results = await layer.queryFeatures({
          where: `MADMA = '${maDMA}'`,
          outSpatialReference: view.spatialReference,
          returnGeometry: true
        });
        view.goTo(results.features);
      }
    }
  }
  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private async handleSubmitClick() {
    const { dmaLayer, suCoLayer } = this.props;
    const { dma, fromDate, toDate, isCheDoDanhSach } = this.state;

    if (!dmaLayer || !suCoLayer || !fromDate || !toDate
      || (!dma && !isCheDoDanhSach)) {
      this.setState({
        error: 'Dữ liệu đầu vào còn thiếu',
        result: undefined,
        isLoadingResult: false
      });
      return;
    }

    this.setState({
      error: undefined,
      result: undefined,
      isLoadingResult: true
    });
    try {
      suCoLayer.definitionExpression = '1=2'; // tắt hiển thị
      if (isCheDoDanhSach) {
        const results = await api.layDanhSachSCTheoDMA({
          tuNgay: fromDate, denNgay: toDate
        });

        if (results.length > 0) {
          // truy vấn theo cú pháp IN
          let inClause = results.map(m => `'${m.IDSuCo}'`).join(', ');
          if (inClause.length > 0) {
            suCoLayer.definitionExpression = `IDSuCo IN (${inClause})`;
          }
        }

        this.setState({
          resultDSSC: results, error: undefined
        });
      } else {
        // dữ liệu GIS DMA
        let dmaQuery = new Query({
          returnGeometry: true,
          where: `MADMA = '${dma}'`,
          outFields: ['OBJECTID']
        });

        let dmaResults = await dmaLayer.queryFeatures(dmaQuery);
        if (dmaResults.features.length > 0) {
          const feature = dmaResults.features[0],
            geometry = feature.geometry;

          const tongSanLuongDMA = await api.laySanLuong({
            maDMA: dma as string, tuNgay: fromDate, denNgay: toDate
          });

          // thất thoát

          let sdChuQuan = new StatisticDefinition({
            statisticType: 'sum',
            onStatisticField: 'LuongNuocThatThoatChuQuan',
            outStatisticFieldName: 'TTCQ'
          });
          let sdKhachQuan = new StatisticDefinition({
            statisticType: 'sum',
            onStatisticField: 'LuongNuocThatThoatKhachQuan',
            outStatisticFieldName: 'TTKQ'
          });

          let sdSoLuong = new StatisticDefinition({
            statisticType: 'count',
            onStatisticField: 'OBJECTID',
            outStatisticFieldName: 'SoLuong'
          });
          let suCoQuery = new Query({
            outStatistics: [sdChuQuan, sdKhachQuan, sdSoLuong],
            geometry
          });

          const thatThoatResult = await suCoLayer.queryFeatures(suCoQuery),
            thatThoat = thatThoatResult.features[0];
          const attributes = thatThoat.attributes,
            { TTCQ, TTKQ, SoLuong } = attributes;

          const result: SuCoResult = {
            TTCQ, TTKQ, SanLuongDMA: tongSanLuongDMA ? tongSanLuongDMA.toFixed(3) : 0,
            TongSuCo: SoLuong
          };

          // hiển thị sự cố
          suCoLayer.queryFeatures({
            outFields: ['OBJECITD'],
            geometry,
            returnGeometry: false
          })
            .then((results) => {
              // truy vấn theo cú pháp IN
              let inClause = results.features.map(m => `'${m.attributes.OBJECTID}'`).join(', ');
              if (inClause.length > 0) {
                suCoLayer.definitionExpression = `OBJECTID IN (${inClause})`;
              }
            });

          this.setState({
            result,
            error: undefined
          });
        }
      }
    } catch (error) {
      let message = 'Có lỗi xảy ra trong quá trình thực hiện';

      if (typeof (error) === 'string') {
        message = error;
      } else if (error.Message) {
        message = error.Message;
      }
      this.setState({
        error: message,
        result: undefined
      });
    }
    finally {
      this.setState({ isLoadingResult: false });
    }
  }

  private giaTriTonThat(giaTri: number) {
    const { result } = this.state;
    if (result && result.SanLuongDMA > 0) {
      return (
        (result.SanLuongDMA -
          (result.SanLuongDMA - result.TTKQ)) * 100
        / result.SanLuongDMA
      ).toFixed(2);
    } else {
      return 0;
    }
  }
}

export default SuCoTabComponent;