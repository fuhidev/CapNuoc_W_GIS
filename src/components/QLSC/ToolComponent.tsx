import * as React from 'react';
import {
  Paper, Divider, TextField, SelectField, MenuItem,
  RaisedButton, Toggle, Snackbar
} from 'material-ui';
import { PieChart, Legend, Pie, Cell, Tooltip } from 'recharts';
import { MuiThemeProvider } from 'material-ui/styles';
import * as moment from '../../modules/moment';
import DatePicker from '../material-ui/DatePicker';

import { KetQuaTruyVan, TrangThai, DEFAULT_DEF, ThongKe } from '../../models/SuCo';

// ESRI
import Circle = require('esri/geometry/Circle');
import Graphic = require('esri/Graphic');
import SimpleFillSymbol = require('esri/symbols/SimpleFillSymbol');

// APP
import * as tonThatDMAApi from '../../apis/TonThatDMAApi';
import DMA from '../../models/DMA';
import { LAYER as CST_LAYER } from '../../constants/map';
import FeatureLayer from '../../map-lib/layers/FeatureLayer';
const COLORS = ['#e10808', '#009c10', '#f0e91d'];
const SEARCH_OUTFIELDS = ['OBJECTID', 'IDSuCo', 'DiaChi', 'SDTPhanAnh', 'NguoiPhanAnh ', 'TGPhanAnh', 'NhomKhacPhuc'];
type States = {
  datas: ThongKe[],
  isHienSCHoanThanh: boolean,
  dmaDatas: DMA[],
  NguoiPhanAnhDatas?: any[],
  noiDungTimKiem: {
    diaChi?: string,
    quanHuyen?: string,
    tuNgayThongBao?: Date,
    denNgayThongBao?: Date,
    NguoiPhanAnh?: string,
    idSuCo?: string,
    timTrongKhoang: number,
    dma?: string
  },
  snackbar: string;
};

type Props = {
  hienDangTai: (isShow: boolean) => void
  view: __esri.MapView,
  hienKetQua: (datas?: KetQuaTruyVan[]) => void
};
class ToolComponent extends React.Component<Props, States> {
  private handleClickMapView: IHandle;
  constructor(props: Props) {
    super(props);
    this.state = {
      datas: [{
        name: 'Chưa sửa', value: 1, code: TrangThai.CHUA_SUA
      }, {
        name: 'Đã sửa', value: 1, code: TrangThai.DA_SUA
      }],
      isHienSCHoanThanh: false,
      dmaDatas: [],
      noiDungTimKiem: { tuNgayThongBao: new Date(), timTrongKhoang: 0 },
      snackbar: ''
    };
  }
  render() {
    const {
      datas,
      noiDungTimKiem,
      snackbar,
      isHienSCHoanThanh,
      NguoiPhanAnhDatas,
      dmaDatas
    } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <div className="tool">
            <Toggle
              style={{ position: 'absolute', top: 5, left: 0 }}
              label={(isHienSCHoanThanh ? "Ẩn" : "Hiện") + " sự cố hoàn thành"}
              labelPosition="right"
              toggled={isHienSCHoanThanh}
              onToggle={this.onToggleSCHoanThanh.bind(this)}
            />
            <Paper className="statistic">
              <div className="title">Thống kê</div>
              <div className="total">Tổng sự cố: {this.tinhTongSuCo()}</div>
              <div style={{ textAlign: 'center' }}>
                <i >(Mặc định thống kê trong ngày hôm nay)</i>
              </div>
              <PieChart width={300} height={400}>
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

            </Paper>
            <Divider />
            <Paper className="search">
              <div className="title">Tìm kiếm</div>
              <div>
                <Toggle
                  label="Tìm theo khoảng"
                  toggled={noiDungTimKiem.timTrongKhoang !== 0}
                  onToggle={this.handelToggle.bind(this)}
                />
                {
                  noiDungTimKiem.timTrongKhoang !== 0 &&
                  <TextField
                    id="timKiemTrongKhoang"
                    floatingLabelText="Đơn vị mét"
                    fullWidth={true}
                    value={noiDungTimKiem.timTrongKhoang}
                    onChange={(e: any, value: any) =>
                      this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, timTrongKhoang: value } })}
                  />
                }
              </div>
              <TextField
                id="timTheoID"
                fullWidth={true}
                floatingLabelText="Tìm kiếm sự cố theo ID"
                value={noiDungTimKiem.idSuCo}
                onChange={(e: any, value: any) =>
                  this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, idSuCo: value } })}
              />
              <TextField
                fullWidth={true}
                floatingLabelText="Tìm theo địa chỉ"
                value={noiDungTimKiem.diaChi}
                onChange={(e: any, value: any) =>
                  this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, diaChi: value } })}
              />
              <DatePicker
                fullWidth={true}
                floatingLabelText="Từ ngày thông báo"
                value={noiDungTimKiem.tuNgayThongBao}
                onChange={(e: any, value: any) =>
                  this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, tuNgayThongBao: value } })}
              />
              <DatePicker
                fullWidth={true}
                floatingLabelText="Đến ngày thông báo"
                value={noiDungTimKiem.denNgayThongBao}
                defaultDate={new Date()}
                onChange={(e: any, value: any) =>
                  this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, denNgayThongBao: value } })}
              />
              <SelectField
                fullWidth={true}
                floatingLabelText="Người cập nhật"
                value={noiDungTimKiem.NguoiPhanAnh}
                onChange={(e: any, index: any, value: any) =>
                  this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, NguoiPhanAnh: value } })}
              >
                <MenuItem primaryText="Người cập nhật" />
                {
                  NguoiPhanAnhDatas &&
                  NguoiPhanAnhDatas.map(m =>
                    <MenuItem key={m} value={m} primaryText={m} />
                  )
                }
              </SelectField>
              {noiDungTimKiem.timTrongKhoang === 0 &&
                <div>
                  {
                    !noiDungTimKiem.dma &&
                    <SelectField
                      id="chonQuanHuyen"
                      fullWidth={true}
                      floatingLabelText="Chọn quận huyện"
                      value={noiDungTimKiem.quanHuyen}
                      onChange={(e: any, index: any, value: any) =>
                        this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, quanHuyen: value } })}
                    >
                      <MenuItem id="chonQuanHuyenText" primaryText="Chọn quận huyện" />
                      <MenuItem id="chonQuanHuyen777" value="777" primaryText="Quận Bình Tân" />
                      <MenuItem id="chonQuanHuyen774" value="774" primaryText="Quận 5" />
                      <MenuItem id="chonQuanHuyen775" value="775" primaryText="Quận 6" />
                      <MenuItem id="chonQuanHuyen776" value="776" primaryText="Quận 8" />
                    </SelectField>
                  }
                  <SelectField
                    id="chonDMA"
                    fullWidth={true}
                    floatingLabelText="Chọn DMA"
                    value={noiDungTimKiem.dma}
                    onChange={(e: any, index: any, value: any) => {
                      this.setState({ noiDungTimKiem: { ...this.state.noiDungTimKiem, dma: value } });
                      this.focusDMA(value);
                    }}
                  >
                    <MenuItem key={'dmadefault'} primaryText="Chọn DMA" />
                    {
                      dmaDatas.map(m => <MenuItem key={'dma' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
                    }
                  </SelectField>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                      <RaisedButton primary={true}
                        label="Lọc"
                        fullWidth={true}
                        onClick={this.search.bind(this)} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <RaisedButton secondary={true}
                        label="Xóa lọc"
                        fullWidth={true}
                        onClick={this.huyLoc.bind(this)} />
                    </div>

                  </div>
                </div>
              }
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

  componentDidMount() {
    const suCoLayer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;

    this.updateChart();

    tonThatDMAApi.layLoggerDMA()
      .then((dmaDatas) => {
        this.setState({ dmaDatas });
      });

    // cập nhật dữ liệu người cập nhật
    if (!this.state.NguoiPhanAnhDatas && this.props.view) {
      if (suCoLayer) {
        suCoLayer.queryFeatures({
          outFields: ['NguoiPhanAnh'],
          returnDistinctValues: true,
          returnGeometry: false
        })
          .then((results) => {
            this.setState({
              NguoiPhanAnhDatas: results.features.map(m =>
                m.attributes.NguoiPhanAnh)
            });
          });
      }
    }

  }

  private updateChart() {
    const suCoLayer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;

    // truy vấn dữ liệu
    suCoLayer.queryFeatures({
      outFields: ['TrangThai'],
      returnGeometry: false,
      where: suCoLayer.definitionExpression ? suCoLayer.definitionExpression : '1=1'
    }).then(result => {
      // lọc dữ liệu
      const chuaSua = result.features.filter(f => f.attributes.TrangThai === TrangThai.CHUA_SUA).length,
        daSua = result.features.filter(f => f.attributes.TrangThai === TrangThai.DA_SUA).length;

      let state = this.state.datas.slice();
      state[0].value = chuaSua;
      state[1].value = daSua;
      this.setState({ datas: state });
    });
  }

  private onToggleSCHoanThanh(event: object, isInputChecked: boolean) {
    // phụ thuộc vào value mà set definition
    const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
    if (isInputChecked) {
      layer.removeDefinitionExpression(DEFAULT_DEF);
    } else {
      layer.addDefinitionExpression(DEFAULT_DEF);
    }
    // layer.refresh();
    this.setState({ isHienSCHoanThanh: !this.state.isHienSCHoanThanh });
    // this.updateChart();
    this.huyLoc();
  }

  private huyLoc() {
    const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
    layer.resetDefinitionExpression();
    this.updateChart();
    this.props.hienKetQua(undefined);
    this.setState({
      noiDungTimKiem: {
        tuNgayThongBao: undefined,
        denNgayThongBao: undefined,
        diaChi: undefined,
        dma: undefined,
        idSuCo: undefined,
        NguoiPhanAnh: undefined,
        quanHuyen: undefined,
        timTrongKhoang: 0
      }
    });
  }

  private async focusDMA(maDMA: string) {
    const { view } = this.props;
    // lấy layer sự cố
    const dmaLayer = view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;

    // nếu không tồn tại thì dừng
    if (!dmaLayer) { return; }

    // truy vấn theo mã dma
    const result = await dmaLayer.queryFeatures({
      where: `MADMA = '${maDMA}'`,
      outFields: [],
      returnGeometry: true,
      outSpatialReference: view.spatialReference
    });

    view.goTo(result.features);
  }

  private tinhTongSuCo() {
    const data = this.state.datas;
    const total = data.reduce((a, b) => ({ value: a.value + b.value } as any));
    return total.value;
  }

  private async handleChartClick(event: any) {
    const code = event.code === undefined ? 0 : event.code;

    // lấy layer
    const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;

    // truy vấn dữ liệu
    this.props.hienDangTai(true);
    try {

      let where = `TrangThai = ${code}`;

      if (layer.layerInfo.Definition) {
        where = `${layer.layerInfo.Definition} and (${where})`;
      }

      const results = await layer.queryFeatures({
        where,
        outFields: SEARCH_OUTFIELDS,
        returnGeometry: false,
        orderByFields: ['TGPhanAnh DESC']
      });
      this.props.hienKetQua(results.features.map(m => m.attributes));

    } catch (error) {
      this.setState({
        snackbar: 'Có lỗi xảy ra trong tiến trình'
      });
    }
    finally {
      this.props.hienDangTai(false);
    }
  }

  private async search() {
    // lấy layer
    const { view } = this.props;
    const { noiDungTimKiem } = this.state;

    // truy vấn dữ liệu

    const where = [];

    if (noiDungTimKiem.diaChi) {
      where.push(`DiaChi like N'%${noiDungTimKiem.diaChi}%'`);
    }
    if (noiDungTimKiem.tuNgayThongBao) {
      const s = moment.formatyyyymmdd(noiDungTimKiem.tuNgayThongBao, '-');
      where.push(`TGPhanAnh >= date'${s} 00:00:00'`);
    }
    if (noiDungTimKiem.denNgayThongBao) {
      const s = moment.formatyyyymmdd(noiDungTimKiem.denNgayThongBao, '-');
      where.push(`TGPhanAnh <= date'${s} 23:59:59'`);
    }
    if (noiDungTimKiem.quanHuyen) {
      where.push(`MaQuan = '${noiDungTimKiem.quanHuyen}'`);
    }
    if (noiDungTimKiem.NguoiPhanAnh) {
      where.push(`NguoiPhanAnh = N'${noiDungTimKiem.NguoiPhanAnh}'`);
    }
    if (noiDungTimKiem.idSuCo) {
      where.push(`IDSuCo like '%${noiDungTimKiem.idSuCo}%'`);
    }

    // tìm kiếm theo DMA
    // 1. lấy geometry theo mã DMA
    // 2. đưa geometry vào truy vấn với sự cố
    let dmaGeometry;
    if (noiDungTimKiem.dma) {
      const dmaLayer = view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;
      const results = await dmaLayer.queryFeatures({
        where: `MADMA = '${noiDungTimKiem.dma}'`,
        returnGeometry: true
      });
      if (results.features.length === 1) {
        dmaGeometry = results.features[0].geometry;
      } else {
        // nếu không có thì dừng
        this.setState({
          snackbar: 'Không truy vấn được vị trí DMA'
        });
        return;
      }
    }

    // nếu không có câu lệnh truy vấn
    if (where.length === 0 && !noiDungTimKiem.dma) {
      this.setState({
        snackbar: 'Vui lòng lựa chọn tiêu chí'
      });
      return;
    }

    this.props.hienDangTai(true);

    try {
      const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
layer.resetDefinitionExpression();
      // if (layer.layerInfo.Definition) {
      //   where.push(layer.definitionExpression);
      // }

      let whereClause = where.join(' AND ');

      if (layer.layerInfo.Definition) {
        whereClause = where.length > 0 ? `${layer.definitionExpression} and (${whereClause})` : layer.definitionExpression;
      }

      const results = await layer.queryFeatures({
        where: whereClause,
        outFields: SEARCH_OUTFIELDS,
        geometry: dmaGeometry, // nếu có dma thì truy vấn theo dma
        returnGeometry: false,
        orderByFields: ['TGPhanAnh DESC']
      });
      this.props.hienKetQua(results.features.map(m => m.attributes));

      // lọc bản đồ
      if (results.features.length > 0)
        layer.definitionExpression = 'OBJECTID IN (' + results.features.map(m => m.attributes.OBJECTID).join(',') + ')';
      else layer.definitionExpression = '1=2';
      this.updateChart();
    } catch (error) {
      this.setState({
        snackbar: 'Có lỗi xảy ra trong tiến trình'
      });
    }
    finally {
      this.props.hienDangTai(false);
    }
  }

  /**
   * Tìm sự cố trong bán kính
   * @param isRun
   */
  private timTrongKhoang(isRun: boolean = true) {
    const { view } = this.props;

    // nếu như ở chế độ chạy
    if (isRun) {
      // hiển thị thông báo
      this.setState({
        snackbar: 'Nhấn chuột vào bản đồ để chọn vị trí truy vấn'
      });
      this.props.hienDangTai(true);

      // đăng ký sự kiện click chuột vào màn hình
      if (!this.handleClickMapView) {
        this.handleClickMapView = view.on('click', this.queryDistance.bind(this));
      }
    } else {
      // nếu có đăng ký sự kiện rồi thì xóa
      if (this.handleClickMapView) {
        this.handleClickMapView.remove();
        delete this.handleClickMapView;
        view.graphics.removeAll();
        return;
      }
    }
  }

  private async queryDistance(e: __esri.MapViewClickEvent) {
    const { view } = this.props;
    const suCoLayer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as FeatureLayer;
    const { noiDungTimKiem } = this.state;
    // xóa graphic đã có
    view.graphics.removeAll();

    const distance = this.state.noiDungTimKiem.timTrongKhoang;

    try {
      e.stopPropagation();
      // lấy tọa độ nhấn chuột
      const point = e.mapPoint;

      // tạo vùng bán kính theo distance
      const circle = new Circle({
        center: point, radius: distance, spatialReference: view.spatialReference
      });

      // thêm vùng vào bản đồ
      const symbol = new SimpleFillSymbol({
        color: 'rgba(144, 129, 188, 0.5)',
        outline: {
          color: '#fff'
        }
      });
      const graphic = new Graphic({
        geometry: circle, symbol
      });

      view.graphics.add(graphic);

      // truy vấn dữ liệu
      let query = suCoLayer.createQuery();
      // tìm theo điều kiện
      const where = [];
      if (noiDungTimKiem.tuNgayThongBao) {
        const s = moment.formatyyyymmdd(noiDungTimKiem.tuNgayThongBao, '-');
        where.push(`TGPhanAnh >= date'${s} 00:00:00'`);
      }
      if (noiDungTimKiem.denNgayThongBao) {
        const s = moment.formatyyyymmdd(noiDungTimKiem.denNgayThongBao, '-');
        where.push(`TGPhanAnh <= date'${s} 23:59:59'`);
      }
      if (noiDungTimKiem.NguoiPhanAnh) {
        where.push(`NguoiPhanAnh = N'${noiDungTimKiem.NguoiPhanAnh}'`);
      }

      if (where.length > 0) {
        query.where = where.join(' AND ');
      }
      if (suCoLayer.layerInfo.Definition) {
        query.where = where.length > 0 ? `(${suCoLayer.definitionExpression}) and (${query.where})` : suCoLayer.definitionExpression;
      }

      query.geometry = circle; // truy vấn tại vị trí người dùng chọn
      query.outFields = SEARCH_OUTFIELDS;
      const results = await suCoLayer.queryFeatures(query);
      this.props.hienKetQua(results.features.map(m => m.attributes));

    } catch (error) {
      view.graphics.removeAll();
      this.setState({
        snackbar: 'Có lỗi xảy ra trong tiến trình'
      });
    }
    finally {
      this.props.hienDangTai(false);
    }
  }

  private handelToggle(e: any, isInputChecked: boolean) {
    this.setState({
      noiDungTimKiem: { ...this.state.noiDungTimKiem, timTrongKhoang: isInputChecked ? 10 : 0 }
    });

    // nếu như bật chế độ
    this.timTrongKhoang(isInputChecked);

  }
}
export default ToolComponent;