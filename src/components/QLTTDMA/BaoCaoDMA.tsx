import * as React from 'react';
import { TextField, RaisedButton, SelectField, MenuItem, FlatButton } from 'material-ui';
import DMA from '../../models/DMA';
import * as baoCaoDMA from '../../models/baocaodma';
import { LAYER as CST_LAYER } from '../../constants/map';
interface Props {
  dmas: DMA[];
  view?: __esri.MapView;
}

interface States {
  isLoadingResult: boolean;
  error?: string;
  dma?: string;
}

class BaoCaoDMAComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingResult: false,
    };
  }
  render() {
    const { dma, isLoadingResult, error } = this.state;
    const { dmas } = this.props;
    return (
      <div>
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
            dmas.map(m => <MenuItem key={'tieuthu' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
          }
        </SelectField>
        <div style={{ textAlign: 'center' }}>
          <a href={this.xuatBaoCaoDMA()} download={'Báo cáo DMA ' + dma + '.xml'}>
            < FlatButton
              disabled={!dma}
              label="Xuất báo cáo"
              fullWidth={true}
            />
          </a>
        </div>
      </div >
    );
  }

  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private xuatBaoCaoDMA() {
    const { } = this.props;
    const { dma } = this.state;
    let tenDMA = dma || '';
    if (dma) {
      const _dma = this.props.dmas.find(f => f.MaDMA === this.state.dma);
      if (_dma) {
        tenDMA = _dma.TenDMA;
      }
    }
    let model: baoCaoDMA.Model = {
      apLucKhuVuc: { manh: 0, yeu: 0, trungbinh: 0 },
      chatLuongNuoc: { tot: 0, trungbinh: 0, xau: 0 },
      duongKinhVatLieuOng: {
        '100mm': { gang: 0, hdpe: 0, upvc: 0 },
        '150mm': { gang: 0, hdpe: 0, upvc: 0 },
        '200mm': { gang: 0, hdpe: 0, upvc: 0 },
        '250mm': { gang: 0, hdpe: 0, upvc: 0 },
        '50mm': { gang: 0, hdpe: 0, upvc: 0 },
      },
      khachHang: { dotDocSo: 0, hanhChinhSuNghiep: 0, khac: 0, sinhHoat: 0, thuongMai: 0 },
      ngayBaoCao: new Date().toLocaleDateString(),
      ngayKhaoSat: new Date().toLocaleDateString(),
      phuong: '', quan: '', soKhachHangVoi: { mucTieuThuDuoi4: 0, mucTieuThuTren4: 0 },
      tenDMA: tenDMA,
      tinhTrangSuDung: { binhThuong: 0, khac: 0, catHuyTam: 0, dongCuaKhongO: 0, thay: 0 },
      tongSoDauNoiDichVu: 0,
      truCuuHoa: { khongTot: 0, tot: 0 },
      tuoiThoDHN: { duoi5Nam: 0, tren5Nam: 0 },
      tuyenDuong: '',
      van: { bien: 0, trong: 0 },
      viTriDongHoTong: { VT1: '', VT2: '' }
    };

    let content = baoCaoDMA.renderContent(model);

    var blob = new Blob([content], { type: 'text/xml;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    return url;
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
}

export default BaoCaoDMAComponent;