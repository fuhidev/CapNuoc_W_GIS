import * as React from 'react';
import {
  Button,
  createStyles, WithStyles, Theme, withStyles
} from '@material-ui/core';
import Stepper, { Item } from './FormComponent/Stepper';
import FormInput from './FormComponent/FormInput';
import FormConfirm from './FormComponent/FormConfirm';

// ESRI
// APP
import SearchWidget, { SelectResult } from './SearchWidget';
import hanhChinhUtils from '../../map-lib/support/HanhChinhUtils';
import FeatureLayer = require('esri/layers/FeatureLayer');
import MSG from './MSG';
import { Model } from '../../services/map/SuCo/model';
const styles = (theme: Theme) => createStyles({
  root: {
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    '& .esri-search': {
      width: '100% !important'
    }
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    color: theme.palette.primary.main,
    padding: 15,
    textAign: 'center'
  },
  info: {
    marginTop: 7
  },
  infoFinishContent: {
    padding: 10
  },
  infoFinishContentId: {
    fontSize: 38,
    fontWeight: 600,
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  infoFinishContentRevert: {
    margin: '20px 0',
    textAlign: 'center'
  }
});

type States = {
  stepIndex: number,
  hoVaTen?: string,
  soDienThoai?: string,
  diaChi?: string,
  noiDung?: string,
  linhVuc?: number,
  nguyenNhan?: string,
  viTri?: __esri.Point,
  dmLinhVuc: __esri.CodedValueDomainCodedValues[],
  dmNguyenNhan: __esri.CodedValueDomainCodedValues[]
};
type Props = {
  view: __esri.MapView | __esri.SceneView,
  layer: FeatureLayer,
  onChangePoint: (point?: __esri.Point) => void,
  newIDSuCo?: string,
  phanAnh: (model: Model, geometry: __esri.Point) => Promise<boolean>,
  chuyenDonVi: () => void
} & WithStyles<typeof styles>;

enum STEP_NAME {
  NHAP_THONG_TIN, XAC_NHAN, HoanThanh
}

class FormComponent extends React.Component<Props, States> {
  private handleChonViTri: IHandle | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      stepIndex: STEP_NAME.NHAP_THONG_TIN,
      dmLinhVuc: [], dmNguyenNhan: []
    };
  }

  render() {
    const { classes, newIDSuCo } = this.props;
    const { stepIndex,
    } = this.state;

    const finished = stepIndex === STEP_NAME.HoanThanh;
    return (
      <div className={classes.root}>
        {/* <div className={classes.title}>
          Thông tin sự cố
        </div> */}
        <div className={classes.info}>
          <Stepper
            index={stepIndex}
            steps={this.getSteps()}
          />
          {finished && (
            <div className={classes.infoFinishContent}>
              <strong>Hệ thống tiếp nhận sự cố có ID: </strong>
              <div className={classes.infoFinishContentId}>{newIDSuCo}</div>
              <p className={classes.infoFinishContentRevert}>

                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.clear();
                  }}
                >
                  Nhấn vào đây
            </a> để thêm thông tin mới.
          </p>
              <p className={classes.infoFinishContentRevert}>

                <a
                  href="#"
                  onClick={this.chuyenDonVi.bind(this)}
                >
                  Nhấn vào đây
            </a> để chuyển cho đơn vị xử lý.
          </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadDMLinhVuc();
    this.chonViTri(true);
  }

  private async onSubmit(): Promise<boolean> {
    try {
      // cập nhật sự cố
      const { view } = this.props;
      const { viTri, diaChi, hoVaTen, soDienThoai, linhVuc, noiDung, nguyenNhan } = this.state;

      if (!viTri) { throw MSG.ChuaChonViTri; }
      if (!diaChi) throw MSG.ChuaNhapDiaChi;

      const hanhChinh = await hanhChinhUtils.getHanhChinhByGeometry(view, viTri); // lấy dữ liệu hành chính tại điểm tiếp nhận phản ánh
      if (!hanhChinh) {
        throw MSG.KhongThuocDiaBan;
      }
      return this.props.phanAnh(
        {
          NguoiPhanAnh: hoVaTen,
          SDTNguoiPhanAnh: soDienThoai,
          DiaChi: diaChi,
          NoiDungPhanAnh: noiDung,
          LinhVuc: linhVuc,
          NguyenNhan: nguyenNhan,
          MaPhuongXa: hanhChinh.MaPhuong, MaHuyenTP: hanhChinh.MaQuan
        } as any,
        viTri
      );
    } catch (error) {
      return false;
    }
    finally {
      // xóa sự kiện chọn vị tri
      if (this.handleChonViTri) {
        this.props.onChangePoint();
        this.handleChonViTri.remove();
        delete this.handleChonViTri;
      }
    }
    return true;
  }

  private clear() {
    this.chonViTri(true);
    this.setState({
      stepIndex: STEP_NAME.NHAP_THONG_TIN,
      diaChi: undefined,
      noiDung: undefined,
      hoVaTen: undefined,
      soDienThoai: undefined,
      viTri: undefined,
      linhVuc: undefined,
      nguyenNhan: undefined
    });
  }
  private getSteps() {
    let steps: Item[] = [];

    const { soDienThoai, hoVaTen, diaChi, noiDung, linhVuc, nguyenNhan, dmLinhVuc, dmNguyenNhan } = this.state;
    steps.push({
      label: 'Nhập thông tin',
      content: <div>
        <p>Nhấp địa chỉ (bắt buộc) sau đó <i>nhấn vào bản đồ để thay đổi vị trí (nếu cần)</i>.</p>
        <SearchWidget
          view={this.props.view}
          selectResult={this.selectResult.bind(this)}
        />
        <FormInput
          onChange={this.handleChange.bind(this)}
          hoVaTen={hoVaTen}
          soDienThoai={soDienThoai}
          diaChi={diaChi}
          noiDung={noiDung}
          nguyenNhan={nguyenNhan}
          linhVuc={linhVuc}
          dmLinhVuc={dmLinhVuc}
          dmNguyenNhan={dmNguyenNhan}
        />
        {this.renderStepActions(STEP_NAME.NHAP_THONG_TIN)}
      </div>
    });

    steps.push({
      label: 'Xác nhận',
      content: <div>
        <FormConfirm
          hoVaTen={hoVaTen}
          soDienThoai={soDienThoai}
          diaChi={diaChi}
          linhVuc={linhVuc ? this.getLinhVucName(linhVuc, dmLinhVuc) : undefined}
        />
        {this.renderStepActions(STEP_NAME.XAC_NHAN)}
      </div>
    });
    return steps;
  }

  private getLinhVucName(linhVuc: number, dmLinhVuc: __esri.CodedValueDomainCodedValues[]): string | undefined {
    if (linhVuc) {
      let codedValue = dmLinhVuc.find(f => f.code === linhVuc);
      return codedValue ? codedValue.name : linhVuc + '';
    }
    return undefined;
  }

  private loadDMLinhVuc() {
    const layer = this.props.layer;
    layer.when(() => {
      let dmLinhVuc = layer.types.map(m => ({ code: m.id.toString(), name: m.name } as __esri.CodedValueDomainCodedValues));
      this.setState({
        dmLinhVuc
      });
    });
  }

  private selectResult(e: SelectResult) {
    if (e.result) {
      if (e.result.feature) {
        this.props.onChangePoint(e.result.feature.geometry as __esri.Point);
        this.setState({
          diaChi: e.result.name,
          viTri: e.result.feature.geometry as __esri.Point
        });
      }
    }
  }

  private async handleNext() {
    const { stepIndex,
      diaChi, viTri
    } = this.state;

    if (stepIndex === STEP_NAME.NHAP_THONG_TIN) {
      if (!viTri || !diaChi) { return; }
    } else if (stepIndex === STEP_NAME.XAC_NHAN) {
      const submitResult = await this.onSubmit();
      // nếu không thành công thì dừng lại
      if (!submitResult) return;
    }

    this.setState({
      stepIndex: stepIndex + 1,
    });
  }

  private handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  private renderStepActions(step: number) {
    const { stepIndex, viTri, diaChi } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={stepIndex === STEP_NAME.NHAP_THONG_TIN && (!viTri || !diaChi)}
          disableTouchRipple={true}
          disableFocusRipple={true}
          onClick={this.handleNext.bind(this)}
          style={{ marginRight: 12 }}
        >
          {stepIndex === STEP_NAME.XAC_NHAN ? 'Phản ánh' : 'Tiếp tục'}
        </Button>
        {step > 0 && (
          <Button
            variant="text"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev.bind(this)}
          >
            Quay lại
          </Button>
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

    // nếu giá trị thay đổi là lĩnh vực thì cập nhật lại dmNguyenNhan
    if (key === 'linhVuc') {
      states['dmNguyenNhan'] = this.getDMNguyenNhan(value);
      states['nguyenNhan'] = undefined; // dổi domain thì set lại giá trị
    }
    this.setState(states);
  }

  /**
   * Lấy domain nguyên nhân theo subtype lĩnh vực
   * @param linhVuc Giá trị lĩnh vực
   */
  private getDMNguyenNhan(linhVuc: number): __esri.CodedValueDomainCodedValues[] {
    let result: __esri.CodedValueDomainCodedValues[] = [];
    const layer = this.props.layer; // lấy layer
    const types = layer.types; // lấy types

    // tìm Type theo giá trị linhVuc
    let featureType = types.find(f => f.id == linhVuc);

    // nếu có featureType 
    if (featureType) {
      // lấy giá trị domain NguyenNhan
      let domain = featureType.domains['NguyenNhan'] as __esri.CodedValueDomain;
      if (domain) {
        result = domain.codedValues;
      }
    }
    return result;
  }

  /**
   * Chọn vị trí báo sự cố trên bản đồ
   * @param mode true nếu kích hoạt
   */
  private chonViTri(mode: boolean) {

    // đăng ký sự kiện
    const view = this.props.view;
    if (mode) {
      // nếu không có view
      if (view) {
        this.handleChonViTri = view.on('click', (e) => {
          e.stopPropagation();

          this.props.onChangePoint(e.mapPoint);

          this.setState({
            viTri: e.mapPoint
          });
        });
      }
    } else {
      if (this.handleChonViTri) {
        this.handleChonViTri.remove();
        delete this.handleChonViTri;
      }
    }
  }

  private chuyenDonVi(event: React.MouseEvent<any>) {
    event.preventDefault();
    this.props.chuyenDonVi();
  }

}

export default withStyles(styles)(FormComponent);