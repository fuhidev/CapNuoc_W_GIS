// REACT
import * as React from 'react';
import { SelectField, MenuItem, RaisedButton, Divider, Paper, LinearProgress, TextField, Toggle } from 'material-ui';

// APP
import DMA, { TieuThuResult } from '../../models/DMA';
import * as api from '../../apis/TonThatDMAApi';
import DatePicker from '../../components/material-ui/DatePicker';
import { LAYER as CST_LAYER } from '../../constants/map';

// ESRI
import Graphic = require('esri/Graphic');
import Point = require('esri/geometry/Point');
import GraphicsLayer = require('esri/layers/GraphicsLayer');
import TextSymbol = require('esri/symbols/TextSymbol');

interface Props {
  dmas: DMA[];
  view?: __esri.MapView;
}

interface States {
  dma?: string;
  ky: number;
  nam: number;
  namDatas: number[];
  kyDatas: number[];
  tuNgay?: Date;
  denNgay?: Date;
  result?: TieuThuResult;
  isLoading: boolean;
  error?: string;
  isCheDoTongThe: boolean;
}

class TieuThuTabComponent extends React.Component<Props, States> {
  private banDoTonThatLayer: GraphicsLayer;
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
      ky: 1,
      nam: new Date().getFullYear(),
      namDatas,
      kyDatas,
      isLoading: false,
      isCheDoTongThe: true
    };
  }
  render() {
    const { dmas } = this.props;
    const { kyDatas, namDatas,
      tuNgay, denNgay, isCheDoTongThe,
      result, isLoading, error } = this.state;
    return (
      <div>
        <Toggle
          labelPosition="right"
          toggled={isCheDoTongThe}
          label="Bản đồ tổn thất tổng thể"
          onToggle={(e: React.MouseEvent<{}>, isInputChecked: boolean) =>
            this.setState({ isCheDoTongThe: isInputChecked })}
        />
        {!isCheDoTongThe &&
          <SelectField
            floatingLabelText="DMA"
            hintText="Chọn DMA"
            fullWidth={true}
            value={this.state.dma}
            onChange={(e: any, index: any, value: any) => {
              this.goToDMA(value);
              this.handleChange('dma', value);
            }}
          >
            {
              dmas.map(m => <MenuItem key={'tieuthu' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
            }
          </SelectField>
        }
        <div>
          <SelectField
            style={{ width: '50%' }}
            floatingLabelText="Năm"
            value={this.state.nam}
            onChange={(e: any, index: any, value: any) => this.handleChange('nam', value)}
          >
            {
              namDatas.map(m => <MenuItem key={'nam' + m} value={m} primaryText={m} />)
            }
          </SelectField>
          <SelectField
            style={{ width: '50%' }}
            floatingLabelText="Kỳ"
            value={this.state.ky}
            onChange={(e: any, index: any, value: any) => this.handleChange('ky', value)}
          >
            {
              kyDatas.map(m => <MenuItem key={'ky' + m} value={m} primaryText={m} />)
            }
          </SelectField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <DatePicker
              fullWidth={true}
              floatingLabelText="Từ"
              value={tuNgay}
              onChange={(event: any, value: any) => this.handleChange('tuNgay', value)}
            />
          </div>
          <div>
            <DatePicker
              style={{ width: '50%' }}
              floatingLabelText="Đến"
              value={denNgay}
              onChange={(event: any, value: any) => this.handleChange('denNgay', value)}
            />
          </div>
        </div>
        <RaisedButton
          fullWidth={true}
          primary={!isCheDoTongThe}
          secondary={isCheDoTongThe}
          label={isCheDoTongThe ? 'Bản đồ tổn thất tổng thể' : 'Tính toán'}
          onClick={() => {
            if (isCheDoTongThe) {
              this.onBieuDoTonThatTongThe();
            } else { this.handleSubmitClick(); }
          }}
        />
        <Divider />
        <div className="result-container">
          {isLoading && <LinearProgress />}
          {error && <div className="error-message">{error}</div>}
          {!isCheDoTongThe && result &&
            <Paper>
              <div className="title">Kết quả</div>
              <div style={{ textAlign: 'center' }}><i>(Số liệu đã làm tròn 2 chữ số)</i></div>
              <div>
                <span>Số lượng đồng hồ khách hàng: </span>
                <strong>{result.SoLuongKH}</strong>
              </div>
              <div>
                <span>Sản lượng khách hàng là : </span>
                <strong>{result.SanLuongKH}</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div>Sản lượng đồng hồ tổng là : </div>
                <div style={{ flexGrow: 1 }}>
                  <input
                    style={{
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px #9E9E9E solid',
                      fontWeight: 'bold'
                    }}
                    type="number"
                    value={result.SanLuongDMA}
                    onChange={this.handleChangeSanLuongDMA.bind(this)}
                    placeholder="Nhập giá trị sản lượng DMA"
                  />
                </div>
              </div>
              <div>
                <span>Sản lượng tồn thất : </span>
                <strong>{this.calSanLuongTonThat()} m3</strong>
              </div>
              <div>
                <span>Phần trăm tổn thất là : </span>
                <strong>{this.calPhanTramTonThat()} %</strong>
              </div>
            </Paper>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.onChangeTime(this.state.nam, this.state.ky);
  }

  private onChangeTime(nam: number, ky: number) {

    // month = kỳ - 1 vì mặc định month được tính từ tháng 0
    const tuNgay = new Date(nam, ky - 1, 1);
    const denNgay = new Date(nam, ky - 1, new Date(nam, ky, 0).getDate());

    this.setState({
      tuNgay, denNgay
    });
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

  /**
   * Cập nhật giá trị state
   * @param key state
   * @param value giá trị state
   */
  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);

    // nếu năm và kỳ thì
    if (key === 'nam' || key === 'ky') {
      const nam = key === 'nam' ? value : states.nam,
        ky = key === 'ky' ? value : states.ky;
      this.onChangeTime(nam, ky);
    }
  }

  /**
   * Sự kiện tính toán
   */
  private async handleSubmitClick() {
    const { dma, nam, ky, tuNgay, denNgay } = this.state;
    if (dma && nam && ky && tuNgay && denNgay) {
      this.setState({
        result: undefined,
        isLoading: true,
        error: undefined
      });
      try {
        const sanLuongKH = await api.laySanLuongKhachHangTrenDMA({ maDMA: dma, nam, ky });
        const sanLuongDMA = await api.laySanLuong({ maDMA: dma, tuNgay, denNgay }) as number;

        const result: TieuThuResult = {
          SanLuongDMA: sanLuongDMA.toFixed(2),
          ...sanLuongKH
        };
        this.setState({
          result,
          isLoading: false,
          error: undefined
        });
      } catch (error) {
        let message = 'Có lỗi xảy ra trong quá trình thực hiện';

        if (typeof (error) === 'string') {
          message = error;
        } else if (error.Message) {
          message = error.Message;
        }
        this.setState({
          error: message,
          isLoading: false,
          result: undefined
        });
      }

    }

  }

  /**
   * Tính sản lượng tổn thất
   */
  private calSanLuongTonThat(): number {
    const result = this.state.result;
    if (result && result.SanLuongDMA > 0 && result.SanLuongKH > 0 && result.SanLuongDMA > result.SanLuongKH) {
      return result.SanLuongDMA - result.SanLuongKH;
    } else {
      return 0;
    }

  }

  /**
   * Tính phần trăm tổn thất
   */
  private calPhanTramTonThat(): string {
    const sanLuongTonThat = this.calSanLuongTonThat();
    const result = this.state.result;
    if (result && result.SanLuongDMA > 0 && result.SanLuongKH > 0 && result.SanLuongDMA > result.SanLuongKH) {
      return (sanLuongTonThat * 100 / result.SanLuongDMA).toFixed(3);
    } else {
      return '0';
    }
  }

  private handleChangeSanLuongDMA(e: any) {
    let result = { ...this.state.result } as TieuThuResult;
    result.SanLuongDMA = parseFloat(e.target.value);
    this.setState({ result });
  }

  private async onBieuDoTonThatTongThe() {
    const { ky, nam, tuNgay, denNgay } = this.state;
    const { view } = this.props;

    if (!this.banDoTonThatLayer && view) {
      this.banDoTonThatLayer = new GraphicsLayer({
        title: 'Bản đồ tổn thất tổng thể',
        minScale: 18000
      });
      view.map.add(this.banDoTonThatLayer);
    } else {
      this.banDoTonThatLayer.removeAll();
    }

    if (view && ky && nam && tuNgay && denNgay) {
      try {
        this.setState({
          isLoading: true, error: undefined
        });
        // layer dma
        const layer = view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;

        // lấy dữ liệu GIS DMA
        const resduLieuDMAs = await layer.queryFeatures({
          returnGeometry: true,
          where: '1=1',
          outFields: ['MADMA', 'TENDMA'],
          outSpatialReference: view.spatialReference
        });
        const duLieuDMAs = resduLieuDMAs.features;

        // zoom đến tỉ lệ scale phù hợp
        view.zoom = 17;
        duLieuDMAs.forEach(async feature => {
          const dma = feature.attributes.MADMA;
          if (!dma) { return; }
          // lấy sản lượng
          const duLieuSanLuong = await api.laySanLuong({ maDMA: dma, tuNgay, denNgay }) as number;
          // lấy tổn thất
          const duLieuTonThat = await api.laySanLuongKhachHangTrenDMA({
            maDMA: dma, nam, ky
          }) as TieuThuResult;

          let tonThat = 0;
          if (duLieuSanLuong && duLieuTonThat) {

            if (duLieuSanLuong > 0
              && duLieuTonThat.SanLuongKH && duLieuTonThat.SanLuongKH >= 0) {
              tonThat = (duLieuSanLuong - duLieuTonThat.SanLuongKH) * 100 /
                duLieuSanLuong;
            }
          }

          // tạo graphic sản lượng
          const centroid = (feature.geometry as __esri.Polygon).centroid;
          const graphicSanLuong = new Graphic({
            geometry: new Point({
              spatialReference: centroid.spatialReference,
              x: centroid.x,
              y: centroid.y + 50
            }),
            symbol: this.renderSymbol(duLieuSanLuong.toFixed(2) + ' m3')
          });

          // tạo graphic tổn thất
          const geoTonThat = new Point({
            spatialReference: centroid.spatialReference,
            x: centroid.x,
            y: centroid.y - 50
          });
          const graphicTonThat = new Graphic({
            geometry: geoTonThat,
            symbol: this.renderSymbol(tonThat.toFixed(2) + ' %', 2)
          });

          // thêm vào layer
          this.banDoTonThatLayer.addMany([graphicSanLuong, graphicTonThat]);
        });

      } catch (error) {
        this.setState({
          error: 'Có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại'
        });
      }
      finally {
        this.setState({
          isLoading: false
        });
      }

    } else {
      this.setState({
        error: 'Vui lòng nhập đầy đủ thông tin'
      });
    }
  }

  private renderSymbol(text: string, isSanLuong: number = 1) {
    const color = isSanLuong === 1 ? '#FF5722' : isSanLuong === 2 ?
      '#FFC107' : '#f01b23';
    let symbol = new TextSymbol({
      text,
      color,
      font: {
        size: isSanLuong === 0 ? 16 : 13,
        family: 'sans-serif'
      }
    });
    return symbol;
  }
}

export default TieuThuTabComponent;