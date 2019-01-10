import * as React from 'react';
import { TextField, RaisedButton, SelectField, MenuItem, FlatButton, Snackbar, LinearProgress } from 'material-ui';
import DMA from '../../models/DMA';
import * as baoCaoDMA from '../../models/baocaodma';
import { LAYER as CST_LAYER } from '../../constants/map';

// ESRI
import geometryEngine = require('esri/geometry/geometryEngine');
import Graphic = require('esri/Graphic');
import TextSymbol = require('esri/symbols/TextSymbol');
import HighlightGrahic from '../../map-lib/support/HighlightGraphic';

interface Props {
  dmas: DMA[];
  view?: __esri.MapView;
}

interface States {
  isLoadingResult: boolean;
  error?: string;
  dma?: string;
  snackbar: string;
}

class VanBuocComponent extends React.Component<Props, States> {
  private highlightGraphic: HighlightGrahic;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingResult: false,
      snackbar: ''
    };
  }
  render() {
    const { dma, isLoadingResult, snackbar } = this.state;
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
            dmas.map(m => <MenuItem key={'vanbuoc' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
          }
        </SelectField>
        <div>
          < FlatButton
            style={{ width: '50%' }}
            label="Đóng"
            onClick={this.clearGraphics.bind(this)}
          />
          < RaisedButton
            style={{ width: '50%' }}
            disabled={!dma}
            primary={true}
            label="Hiển thị"
            onClick={this.onSubmit.bind(this)}
          />
        </div>
        {isLoadingResult && <LinearProgress style={{ marginTop: 10 }} />}
        <Snackbar
          autoHideDuration={4000}
          open={snackbar.length > 0}
          message={snackbar}
          onRequestClose={e => this.setState({ snackbar: '' })}
        />
      </div >
    );
  }

  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private async onSubmit() {

    this.setState({
      isLoadingResult: true
    });

    try {
      // lấy dữ liệu DMA
      const { dma } = this.state;
      const view = this.props.view;
      if (view && dma) {
        if (!this.highlightGraphic) {
          this.highlightGraphic = new HighlightGrahic(view);
        }

        const dhkhLayer = view.map.findLayerById(CST_LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer,
          vanLayer = view.map.findLayerById(CST_LAYER.VAN) as __esri.FeatureLayer,
          dhtLayer = view.map.findLayerById(CST_LAYER.DONG_HO_TONG) as __esri.FeatureLayer,
          ongNganhLayer = view.map.findLayerById(CST_LAYER.ONG_NGANH) as __esri.FeatureLayer,
          ongPhanPhoiLayer = view.map.findLayerById(CST_LAYER.ONG_PHAN_PHOI) as __esri.FeatureLayer,
          vanBuocLayer = view.map.findLayerById(CST_LAYER.VAN_BUOC) as __esri.FeatureLayer;
        if (vanBuocLayer && vanLayer && dhkhLayer && dhtLayer) {
          this.clearGraphics();
          // lấy dữ liệu van bước theo DMA
          const vanBuocResult = (await vanBuocLayer.queryFeatures({
            outSpatialReference: view.spatialReference,
            returnGeometry: true,
            where: `MADMA = '${dma}'`,
            outFields: ['OBJECTID','VanBuoc']
          })).features;
          // nếu có giá trị
          if (vanBuocResult.length > 0) {

            // hiện label van bước
            this.hienLabelVanBuoc(vanBuocResult);

            // tập hợp van bước sẽ là dma
            const union = vanBuocResult.map(m => m.geometry);
            if (union.length > 0) {
              const dmaPolygon = geometryEngine.union(union);
              if (dmaPolygon) {

                // hiển thị dữ liệu van bước
                // truy vấn theo cú pháp IN
                {
                  let inClause = vanBuocResult.map(m => `'${m.attributes.OBJECTID}'`).join(',');
                  if (inClause.length > 0) {
                    vanBuocLayer.definitionExpression = `OBJECTID IN (${inClause})`;
                  }
                }

                // lấy dữ liệu khách hàng
                dhkhLayer.queryFeatures({
                  geometry: dmaPolygon,
                  outFields: ['OBJECTID'],
                  returnGeometry: false
                })
                  .then((results) => {
                    // truy vấn theo cú pháp IN
                    let inClause = results.features.map(m => `'${m.attributes.OBJECTID}'`).join(',');
                    if (inClause.length > 0) {
                      dhkhLayer.definitionExpression = `OBJECTID IN (${inClause})`;
                    }
                  });
                // lấy dữ liệu van
                vanLayer.queryFeatures({
                  geometry: dmaPolygon,
                  outFields: ['OBJECTID'],
                  returnGeometry: false
                })
                  .then((results) => {
                    // truy vấn theo cú pháp IN
                    let inClause = results.features.map(m => `'${m.attributes.OBJECTID}'`).join(',');
                    if (inClause.length > 0) {
                      vanLayer.definitionExpression = `OBJECTID IN (${inClause})`;
                    }
                  });
                // lấy dữ liệu đồng hồ tổng
                dhtLayer.queryFeatures({
                  geometry: dmaPolygon,
                  returnGeometry: true,
                  outFields: [],
                  outSpatialReference: view.spatialReference
                })
                  .then((results) => {
                    const features = results.features;
                    if (features.length > 0) { this.highlightGraphic.addAll(features); }
                  });
                // lấy dữ liệu ống ngánh
                ongNganhLayer.queryFeatures({
                  geometry: dmaPolygon,
                  outFields: ['OBJECTID'],
                  returnGeometry: false
                })
                  .then((results) => {
                    // truy vấn theo cú pháp IN
                    let inClause = results.features.map(m => `'${m.attributes.OBJECTID}'`).join(',');
                    if (inClause.length > 0) {
                      ongNganhLayer.definitionExpression = `OBJECTID IN (${inClause})`;
                    }
                  });
                // lấy dữ liệu ống phân phối
                ongPhanPhoiLayer.queryFeatures({
                  geometry: dmaPolygon,
                  outFields: ['OBJECTID'],
                  returnGeometry: false
                })
                  .then((results) => {
                    // truy vấn theo cú pháp IN
                    let inClause = results.features.map(m => `'${m.attributes.OBJECTID}'`).join(',');
                    if (inClause.length > 0) {
                      ongPhanPhoiLayer.definitionExpression = `OBJECTID IN (${inClause})`;
                    }
                  });
              } else {
                throw 'Có lỗi xảy ra, vui lòng thử lại';
              }
            } else {
              throw 'Có lỗi xảy ra, vui lòng thử lại';
            }
          } else {
            throw `DMA ${dma} không tồn tại van bước`;
          }
        } else {
          throw 'Tài khoản không đủ quyền truy cập lớp dữ liệu để thực hiện thao tác này';
        }
      }
    } catch (error) {
      this.setState({
        snackbar: typeof (error) === 'string' ? error : 'Có lỗi xảy ra trong quá trình thực hiện'
      });
    }
    finally {
      this.setState({
        isLoadingResult: false
      });
    }
  }

  private hienLabelVanBuoc(graphics: Graphic[]) {
    const color = '#ffffff';
    const view = this.props.view;
    if (view) {
      graphics.forEach(g => {
        const ten = g.attributes.VanBuoc;
        let symbol = new TextSymbol({
          text: ten,
          color,
          font: {
            size: 16,
            family: 'sans-serif'
          }
        });
        view.graphics.add(new Graphic({
          symbol, geometry: g.geometry
        }));
      });
    }

  }

  private clearGraphics() {
    // lấy layer
    // trả về trạng thái ban đầu
    try {
      const view = this.props.view;
      if (view) {
        const dhkhLayer = view.map.findLayerById(CST_LAYER.DONG_HO_KHACH_HANG) as __esri.FeatureLayer,
          vanLayer = view.map.findLayerById(CST_LAYER.VAN) as __esri.FeatureLayer,
          ongNganhLayer = view.map.findLayerById(CST_LAYER.ONG_NGANH) as __esri.FeatureLayer,
          ongPhanPhoiLayer = view.map.findLayerById(CST_LAYER.ONG_PHAN_PHOI) as __esri.FeatureLayer,
          vanBuocLayer = view.map.findLayerById(CST_LAYER.VAN_BUOC) as __esri.FeatureLayer;
        if (vanBuocLayer && vanLayer && dhkhLayer) {
          vanBuocLayer.definitionExpression =
            dhkhLayer.definitionExpression =
            ongNganhLayer.definitionExpression =
            ongPhanPhoiLayer.definitionExpression =
            vanLayer.definitionExpression = '1=2';
        }

        // xóa label van bước
        view.graphics.removeAll();
      }
      // xóa highlight của đồng hồ tổng
      if (this.highlightGraphic) {
        this.highlightGraphic.clear();
      }
    } catch (error) {
      this.setState({
        snackbar: error.message
      });
    }
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

export default VanBuocComponent;