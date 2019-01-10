import * as React from 'react';
import {
  RaisedButton, FlatButton, Stepper, Step, StepLabel, StepContent,
  TextField, LinearProgress, Snackbar, SelectField, MenuItem, Dialog
} from 'material-ui';
import { Link } from 'react-router-dom';

// ESRI

import Graphic = require('esri/Graphic');
import SimpleMarkerSymbol = require('esri/symbols/SimpleMarkerSymbol');

// APP
import SearchWidget, { SelectResult } from './SearchWidget';
import { LAYER as CST_LAYER, BASEMAP } from '../../constants/map';
import * as api from '../../apis/SuCoApi';
import * as moment from '../../modules/moment';
import { ThongTinPhanAnh, TrangThai } from '../../models/SuCo';
import HanhChinhUtils from '../../map-lib/support/HanhChinhUtils';
type States = {
  stepIndex: number,
  finished: boolean,
  errorForm: {
    hoVaTen?: string,
    soDienThoai?: string,
    diaChi?: string,
    thongTinPhanAnh?: string
  },
  hoVaTen?: string,
  soDienThoai?: string,
  diaChi?: string,
  thongTinPhanAnh?: number,
  maDuong?: string,
  dsMaDuong: Array<{ TenConDuong: string, MaConDuong: string }>
  ghiChu?: number,
  viTri?: __esri.Point,
  isLoading: boolean,
  snackbar: string,
  newIDSuCo: string,
  thongTinPhanAnhDatas?: __esri.CodedValueDomainCodedValues[],
  idsSuCoTrung: string[]
};
type Props = {
  view: __esri.MapView
};

enum STEP_NAME {
  NHAP_THONG_TIN
};

const BUFFER_TIMDUONG = 50;

class FormComponent extends React.Component<Props, States> {
  private search: __esri.widgetsSearch;
  private handleChonViTri: IHandle;
  constructor(props: Props) {
    super(props);
    this.state = {
      stepIndex: STEP_NAME.NHAP_THONG_TIN,
      finished: false,
      errorForm: {},
      isLoading: false,
      snackbar: '',
      newIDSuCo: '',
      dsMaDuong: [],
      idsSuCoTrung: []
    };
  }

  render() {
    const { stepIndex, finished, newIDSuCo,
      errorForm, soDienThoai, hoVaTen, thongTinPhanAnh, thongTinPhanAnhDatas, ghiChu,
      maDuong, dsMaDuong, diaChi,
      isLoading, snackbar, idsSuCoTrung } = this.state;
    return (
      <div >
        {isLoading && <LinearProgress />}
        <div className="title">
          Thông tin sự cố
        </div>
        <div className="info">
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Nhập thông tin</StepLabel>
              <StepContent>
                <p>Nhấp địa chỉ (bắt buộc) sau đó <i>nhấn vào bản đồ để thay đổi vị trí (nếu cần)</i>.</p>
                <SearchWidget
                  view={this.props.view}
                  searchRef={e => this.search = e}
                  selectResult={this.selectResult.bind(this)}
                />
                <TextField
                  id="diaChi"
                  fullWidth={true}
                  floatingLabelText="Địa chỉ"
                  value={diaChi || ''}
                  onChange={(e: any, value: any) =>
                    this.handleChange('diaChi', value)}
                />
                <div>
                  <TextField
                    id="hoVaTen"
                    style={{ width: '50%' }}
                    floatingLabelText="Họ và tên"
                    value={hoVaTen || ''}
                    errorText={errorForm.hoVaTen}
                    onChange={(e: any, value: any) =>
                      this.handleChange('hoVaTen', value)}
                  />
                  <TextField
                    id="soDienThoai"
                    style={{ width: '50%' }}
                    floatingLabelText="Số điện thoại"
                    type="number"
                    value={soDienThoai || ''}
                    errorText={errorForm.soDienThoai}
                    onChange={(e: any, value: any) =>
                      this.handleChange('soDienThoai', value)}
                  />
                </div>
                <div>
                  <SelectField
                    id="thongTinPhanAnh"
                    style={{ width: '50%' }}
                    floatingLabelText="Thông tin phản ánh"
                    value={thongTinPhanAnh}
                    errorText={errorForm.thongTinPhanAnh}
                    onChange={(e: any, index: number, value: any) =>
                      this.handleChange('thongTinPhanAnh', value)}
                  >
                    {
                      thongTinPhanAnhDatas
                      && thongTinPhanAnhDatas.map(m =>
                        <MenuItem key={m.code} value={m.code} primaryText={m.name} />
                      )
                    }
                  </SelectField>
                  <SelectField
                    id="maConDuong"
                    style={{ width: '50%' }}
                    floatingLabelText="Đường"
                    value={maDuong || ''}
                    onChange={(e: any, index: number, value: any) =>
                      this.handleChange('maDuong', value)}
                  >
                    {
                      dsMaDuong
                      && dsMaDuong.map(m =>
                        <MenuItem key={m.MaConDuong} value={m.MaConDuong} primaryText={m.TenConDuong} />
                      )
                    }
                  </SelectField>
                </div>
                {
                  thongTinPhanAnh === ThongTinPhanAnh.Khac &&
                  <TextField
                    id="ghiChu"
                    fullWidth={true}
                    floatingLabelText="Ghi chú"
                    value={ghiChu}
                    onChange={(e: any, value: any) =>
                      this.handleChange('ghiChu', value)}
                  />
                }
                {this.renderStepActions(STEP_NAME.NHAP_THONG_TIN)}
              </StepContent>
            </Step>
          </Stepper>
          {finished && (
            <div className="finish-content">
              <strong>Hệ thống tiếp nhận sự cố có ID: </strong>
              <div className="id">{newIDSuCo}</div>
              <p className="revert">
                <Link to={this.getPhieuCongTacLink()} target="_blank">
                  Xuất phiếu công tác.
                </Link>
              </p>
              <p className="revert">

                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.reset();
                  }}
                >
                  Nhấn vào đây
            </a> để thêm thông tin mới.
          </p>
            </div>
          )}
        </div>
        <Snackbar
          autoHideDuration={4000}
          open={snackbar.length > 0}
          message={snackbar}
          onRequestClose={(e: any) => this.setState({ snackbar: '' })}
        />
      </div>
    );
  }

  private async onSubmit(): Promise<boolean> {
    try {
      this.setState({
        isLoading: true
      });
      // cập nhật sự cố
      const view = this.props.view;
      if (view) {
        const { viTri, diaChi, hoVaTen, soDienThoai, thongTinPhanAnh, ghiChu,
          maDuong } = this.state;

        // lấy layer điểm sự cố
        const layer = view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;
        if (!viTri) { throw 'Không xác định vị trí'; }

        const geometry = viTri;

        const hanhChinh = await HanhChinhUtils.getHanhChinhByGeometry(view, viTri);
        if (!hanhChinh) {
          throw 'Sự cố không thuộc địa bàn quản lý';
        }

        const attributes = {
          TrangThai: TrangThai.CHUA_SUA,
          SDTPhanAnh: soDienThoai,
          NguoiPhanAnh: hoVaTen,
          DiaChi: diaChi,
          ThongTinPhanAnh: thongTinPhanAnh,
          MaDuong: maDuong,
          GhiChu: thongTinPhanAnh === 6 && ghiChu ? 'Thông tin phản ánh: ' + ghiChu : null
        };

        const featureAdd = new Graphic({
          attributes, geometry
        });

        const result = await layer.applyEdits({
          addFeatures: [featureAdd]
        });
        const addFeatureResult = result.addFeatureResults[0] as __esri.FeatureEditResult;
        if (addFeatureResult.error) {
          this.setState({
            snackbar: addFeatureResult.error.message
          });
          return false;
        } else {
          const objectId = addFeatureResult.objectId;
          var idSuCo = await api.tiepNhanSuCo(objectId);
          this.setState({
            snackbar: 'Hệ thống đã tiếp nhận sự cố vừa phản ánh',
            newIDSuCo: idSuCo
          });
          view.graphics.removeAll();
          layer.refresh();
          return true;
        }
      }
    } catch (error) {
      this.setState({
        snackbar: typeof (error) === 'string' ? error : error.ExceptionMessage || 'Có lỗi xảy ra trong quá trình thực hiện'
      });
      return false;
    }
    finally {
      this.setState({
        isLoading: false
      });
      this.chonViTri(false);
    }
    return true;

  }

  private hotKey(e: KeyboardEvent) {
    // 84 = t
    if (e.altKey && e.keyCode === 84 && this.state.stepIndex === STEP_NAME.NHAP_THONG_TIN
      && this.state.viTri && this.state.diaChi) {
      this.setState({
        stepIndex: this.state.stepIndex + 1
      });
    }
  }

  private async selectResult(e: SelectResult) {
    if (e.result) {
      if (e.result.feature) {
        try {
          this.props.view.goTo({ target: e.result.feature, zoom: 18 });

          this.setState({ isLoading: true });

          // kiểm tra trùng sự cố
          const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;

          const dateString = moment.formatyyyymmdd(new Date(), '-');

          const features = (await layer.queryFeatures({
            where: `TGPhanAnh >= date'${dateString} 00:00:00' and TGPhanAnh <= date'${dateString} 23:59:59'`,
            outFields: ['IDSuCo'],
            geometry: e.result.feature.geometry,
            distance: 2, units: 'meters', returnGeometry: true, outSpatialReference: this.props.view.spatialReference,
          })).features;

          if (features.length > 0) {
            const ids = features.map(m => m.attributes.IDSuCo);
            if (confirm(`Hệ thống phát hiện ở khu vực này đã tiếp nhận ${ids.length} sự cố với ID lần lượt: ${ids.toString()} trong ngày hôm nay (${new Date().toLocaleDateString()})`)) {
              this.setState({
                diaChi: e.result.name,
                viTri: e.result.feature.geometry as __esri.Point, isLoading: false
              });
            } else {
              this.setState({ isLoading: false });
            }
          } else {
            this.setState({
              diaChi: e.result.name,
              viTri: e.result.feature.geometry as __esri.Point, isLoading: false
            });
          }

        } catch (error) {
          this.setState({ snackbar: 'Có lỗi xảy ra', isLoading: false });
        }
      }
    }
  }

  componentDidMount() {

    if (!this.state.thongTinPhanAnhDatas && this.props.view) {
      this.chonViTri(true);
      // cập nhật domain
      // lấy layer điểm sự cố
      const layer = this.props.view.map.findLayerById(CST_LAYER.DIEM_SU_CO) as __esri.FeatureLayer;
      layer.when(() => {
        const { codedValues } = layer.getFieldDomain('ThongTinPhanAnh') as __esri.CodedValueDomain;
        if (codedValues) {
          this.setState({
            thongTinPhanAnhDatas: codedValues
          });
        }
      });
    }
  }

  componentWillUpdate(props: Props, states: States) {
    if (this.state.stepIndex !== states.stepIndex) {
      if (states.stepIndex === STEP_NAME.NHAP_THONG_TIN) {
        this.chonViTri(true);
      } else {
        this.chonViTri(false);
      }
    }

    // nếu mã đường thay đổi thì cập nhật graphic theo mã đường
    //     if (this.state.maDuong !== states.maDuong) {
    // this.highlightGrp.ad
    //     }

    // nếu vị trí thay đổi thì cập nhật những thành phần liên quan đến vị trí như
    // graphic trên bản đồ
    // danh sách mã đường
    if (this.state.viTri !== states.viTri) {
      this.props.view.graphics.removeAll();

      if (states.viTri) {
        // hiển thị vị trí lên bản đồ
        const graphic = new Graphic({
          geometry: states.viTri,
          symbol: new SimpleMarkerSymbol({
            color: '#f01b23',
            style: 'diamond',
            outline: {
              color: '#fff'
            }
          })
        });

        this.props.view.graphics.add(graphic);

        this.layTimDuongTheoViTri(states.viTri);
      } else {
        // nếu vị trí mới = null thì cập nhật lại danh sách con đường
        this.setState({ dsMaDuong: [] });
      }
      return false;
    }
  }

  /**
   * Lấy những tim đường buffer khoảng cách xung quanh vị trí
   * @param viTri vị trí cần lấy tọa đọ
   */
  private async layTimDuongTheoViTri(viTri: __esri.Point) {
    // Lấy bản đồ nền
    const basemap = this.props.view.map.findLayerById(CST_LAYER.BASE_MAP) as __esri.MapImageLayer;
    if (basemap) {
      // lấy tim đường
      const timDuongLayer = basemap.findSublayerById(BASEMAP.INDEX_TIM_DUONG);
      if (timDuongLayer) {
        try {
          const result = await timDuongLayer.queryFeatures({
            geometry: viTri, // truy vấn theo vị trí
            distance: BUFFER_TIMDUONG, // cách vị trí một khoảng distance,
            units: 'meters', // với khoảng cách là mét
            outFields: ['TenConDuong', 'MaConDuong'],
            returnGeometry: false,
            where: 'TenConDuong is not null and MaConDuong is not null'
          });

          const features = result.features,
            attributes = features.map(m => m.attributes);

          let dsMaDuong: Array<any> = [];

          // duyệt danh sách nếu có đối tượng trùng thì lọc

          if (features.length > 0) {
            attributes.forEach(f => {
              // nếu chưa có trong danh sách thì thêm vào
              if (!dsMaDuong.some(s => s.MaConDuong === f.MaConDuong)) {
                dsMaDuong.push(f);
              }
            });
          }

          this.setState({
            dsMaDuong: dsMaDuong,
            maDuong: dsMaDuong.length > 0 ? dsMaDuong[0].MaConDuong : undefined // nếu có giá trị trả về thì set theo giá trị đầu tiên
          })
        } catch (error) {
          throw error;
        }
      } else {
        throw 'Không xác định được lớp dữ liệu tim đường';
      }
    } else {
      throw 'Không xác định được lớp dữ liệu nền';
    }
  }

  private async handleNext() {
    const { stepIndex,
      diaChi, soDienThoai, viTri
    } = this.state;
    if (stepIndex === STEP_NAME.NHAP_THONG_TIN) {
      if (!viTri || !diaChi) return;
      // kiểm tra nhập thông tin đầy đủ hay chưa
      const error = {
        // hoVaTen: (!hoVaTen || (hoVaTen && hoVaTen.length === 0)) ? 'Nhập đầy đủ thông tin' : undefined,
        // soDienThoai: (!soDienThoai || (soDienThoai && soDienThoai.length === 0)) ? 'Nhập đầy đủ thông tin' : undefined,
        // thongTinPhanAnh:
        //   (!thongTinPhanAnh) ? 'Nhập đầy đủ thông tin' : undefined
      };
      this.setState({
        errorForm: error
      });

      // if (
      // error.hoVaTen
      // || 
      // error.soDienThoai
      // ) {
      //   return;
      // }
      const result = await this.onSubmit();
      if (!result) {
        return;
      }
    }

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= STEP_NAME.NHAP_THONG_TIN,
    });
  }

  private handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  private renderStepActions(step: number) {
    const { stepIndex, viTri, diaChi, soDienThoai } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label='Phản ánh'
          disabled={stepIndex === STEP_NAME.NHAP_THONG_TIN &&
            (!viTri || !diaChi)}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext.bind(this)}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Quay lại"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev.bind(this)}
          />
        )}
      </div>
    );
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
  }

  /**
   * Chọn vị trí báo sự cố trên bản đồ
   * @param mode true nếu kích hoạt
   */
  private chonViTri(mode: boolean) {
    if (mode) {
      // đăng ký sự kiện
      const view = this.props.view;
      this.handleChonViTri = view.on('click', (e) => {
        e.stopPropagation();
        view.graphics.removeAll();

        this.setState({
          viTri: e.mapPoint
        });
      });
    } else {
      if (this.handleChonViTri) {
        this.handleChonViTri.remove();
        delete this.handleChonViTri;
      }
    }
  }

  private getPhieuCongTacLink() {
    const { newIDSuCo
    } = this.state;

    return api.inPhieuCongTac(newIDSuCo);
  }

  private reset() {
    this.setState({
      stepIndex: 0, finished: false,
      diaChi: undefined,
      hoVaTen: undefined,
      soDienThoai: undefined,
      viTri: undefined,
      maDuong: undefined,
      thongTinPhanAnh: undefined,
      ghiChu: undefined,
      errorForm: {},
      idsSuCoTrung: []
    });
  }
}

export default FormComponent;