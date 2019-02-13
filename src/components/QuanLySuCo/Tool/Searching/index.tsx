import * as React from 'react';
import BaseComponent from '../../../BaseComponent';
import {
  Typography, createStyles, Theme, WithStyles, withStyles, LinearProgress
} from '@material-ui/core';
import SearchingForm from './SearchingForm';
import ActionComponent from './ActionComponent';

// Redux
import { timKiem } from '../../../../services/map/SuCo/action';
import { alertActions } from '../../../../services/main/action';
import { connect } from 'react-redux';

// Esri
import FeatureLayer from '../../../../map-lib/layers/FeatureLayer';
import { ThongTinPhanAnh, ModelConstant } from '../../../../services/map/SuCo/model';
import * as queryHelper from '../../../../map-lib/support/queryHelper';
import { AllModelReducer } from '../../../../reducers';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  actionContainer: {
    padding: theme.spacing.unit * 2
  }
});

type State = {
  maSuCo?: string,
  sdtNguoiPhanAnh?: string,
  tgPhanAnhFrom?: Date,
  tgPhanAnhTo?: Date,
  thongTinPhanAnh?: ThongTinPhanAnh,
  thongTinPhanAnhValues?: __esri.CodedValueDomainCodedValues[]
};

type StateToProps = {
  layerSuCo?: FeatureLayer
};

type DispatchToProps = {
  search: (where: string) => void,
  alertError: (message: string) => void,
};

type Props = {
}
  & StateToProps
  & DispatchToProps & WithStyles<typeof styles>;

class SearchingComponent extends BaseComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(props: Props) {
    // nếu nhận được layer và chưa load dm lĩnh vực
    if (props.layerSuCo !== this.props.layerSuCo && !this.state.thongTinPhanAnhValues) {
      this.loadDMThongTinPhanAnh();
    }
  }
  render() {
    if (!this.props.layerSuCo) { return <LinearProgress />; }
    const { classes } = this.props;
    const { maSuCo, sdtNguoiPhanAnh, tgPhanAnhFrom, tgPhanAnhTo,
      thongTinPhanAnh, thongTinPhanAnhValues } = this.state;

    return <div className={classes.root}>
      <Typography variant="h6">Nhập nội dung tìm kiếm</Typography>
      <SearchingForm
        maSuCo={maSuCo}
        sdtNguoiPhanAnh={sdtNguoiPhanAnh}
        tgPhanAnhFrom={tgPhanAnhFrom}
        tgPhanAnhTo={tgPhanAnhTo}
        onChange={this.onItemFormChange.bind(this)}
        thongTinPhanAnhValues={thongTinPhanAnhValues || []}
        thongTinPhanAnh={thongTinPhanAnh}
      />
      <div className={classes.actionContainer}>
        <ActionComponent
          onClear={this.onClear.bind(this)}
          onSearch={this.onSearch.bind(this)}
        />
      </div>
    </div>;
  }

  /**
   * Tải domain lĩnh vực
   */
  private loadDMThongTinPhanAnh() {
    const layer = this.props.layerSuCo;
    if (layer) {
      layer.when(() => {
        let dmThongTinPhanAnh = (layer.getFieldDomain(ModelConstant.ThongTinPhanAnh) as __esri.CodedValueDomain);
        if (!dmThongTinPhanAnh) {
          this.props.alertError('Không xác định được domain thuộc tính ' +
            (layer.fields.find(f => f.name === ModelConstant.ThongTinPhanAnh) as __esri.Field).alias);
        }
        else { this.setState({ thongTinPhanAnhValues: dmThongTinPhanAnh.codedValues }); }
      });
    }
  }

  private onSearch() {
    let whereArray = [];
    const { maSuCo, sdtNguoiPhanAnh, tgPhanAnhFrom, tgPhanAnhTo,
      thongTinPhanAnh } = this.state;
    if (maSuCo) {
      whereArray.push(`${ModelConstant.IDSuCo} like '%${maSuCo}%'`);
    }
    if (sdtNguoiPhanAnh) {
      whereArray.push(`${ModelConstant.SDTPhanAnh} like '%${sdtNguoiPhanAnh}%'`);
    }
    if (tgPhanAnhFrom) {
      whereArray.push(`${ModelConstant.TGPhanAnh} >= date'${queryHelper.formatDate(tgPhanAnhFrom)}`);
    }
    if (tgPhanAnhTo) {
      whereArray.push(`${ModelConstant.TGPhanAnh} <= date'${queryHelper.formatDate(tgPhanAnhTo)}`);
    }
    if (thongTinPhanAnh) {
      whereArray.push(`${ModelConstant.ThongTinPhanAnh}='${thongTinPhanAnh}'`);
    }
    this.props.search(whereArray.join(' AND '));
  }

  private onClear() {
    this.setState({
      maSuCo: undefined,
      sdtNguoiPhanAnh: undefined,
      tgPhanAnhFrom: undefined,
      tgPhanAnhTo: undefined,
      thongTinPhanAnh: undefined
    });
  }

  private onItemFormChange(name: string, value: any) {
    let state = {
      [name]: value
    };

    this.setState(state as any);
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  layerSuCo: state.mapSuCo.layer
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  search: (where: string) => dispatch(timKiem(where)),
  alertError: (message: string) => dispatch(alertActions.error(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchingComponent));