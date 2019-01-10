import * as React from 'react';
import BaseComponent from '../../../BaseComponent';
import {
  Typography, createStyles, Theme, WithStyles, withStyles, LinearProgress
} from '@material-ui/core';
import SearchingForm from './SearchingForm';
import ActionComponent from './ActionComponent';


//Redux
import { timKiem } from '../../../../services/map/SuCo/action';
import { alertActions } from '../../../../services/main/action';
import { connect } from 'react-redux';

//Esri
import FeatureLayer from '../../../../map-lib/layers/FeatureLayer';
import { LinhVuc, ModelConstant } from '../../../../services/map/SuCo/model';
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
  linhVuc?: LinhVuc,
  linhVucValues?: __esri.CodedValueDomainCodedValues[]
};

type StateToProps = {
  layerSuCo?: FeatureLayer
};

type DispatchToProps = {
  search: (where: string) => void,
  alertError: (message: string) => void,
}

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
    if (props.layerSuCo != this.props.layerSuCo && !this.state.linhVucValues) {
      this.loadDMLinhVuc();
    }
  }
  render() {
    if (!this.props.layerSuCo)
      return <LinearProgress />
    const { classes } = this.props;
    const { maSuCo, sdtNguoiPhanAnh, tgPhanAnhFrom, tgPhanAnhTo,
      linhVuc, linhVucValues } = this.state;

    return <div className={classes.root}>
      <Typography variant="h6">Nhập nội dung tìm kiếm</Typography>
      <SearchingForm
        maSuCo={maSuCo}
        sdtNguoiPhanAnh={sdtNguoiPhanAnh}
        tgPhanAnhFrom={tgPhanAnhFrom}
        tgPhanAnhTo={tgPhanAnhTo}
        onChange={this.onItemFormChange.bind(this)}
        linhVucValues={linhVucValues || []}
        linhVuc={linhVuc}
      />
      <div className={classes.actionContainer}>
        <ActionComponent
          onClear={this.onClear.bind(this)}
          onSearch={this.onSearch.bind(this)}
        />
      </div>

    </div>
  }

  /**
   * Tải domain lĩnh vực
   */
  private loadDMLinhVuc() {
    const layer = this.props.layerSuCo;
    if (layer) {
      layer.when(() => {
        let dmLinhVuc = layer.types.map(m => ({ code: m.id.toString(), name: m.name } as __esri.CodedValueDomainCodedValues));
        if (!dmLinhVuc)
          this.props.alertError('Không xác định được domain thuộc tính ' +
            (layer.fields.find(f => f.name === ModelConstant.LinhVuc) as __esri.Field).alias);
        else
          this.setState({ linhVucValues: dmLinhVuc })
      });
    }
  }

  private onSearch() {
    let whereArray = [];
    const { maSuCo, sdtNguoiPhanAnh, tgPhanAnhFrom, tgPhanAnhTo,
      linhVuc } = this.state;
    if (maSuCo) {
      whereArray.push(`MaSuCo like '%${maSuCo}%'`);
    }
    if (sdtNguoiPhanAnh) {
      whereArray.push(`SDTNguoiPhanAnh like '%${sdtNguoiPhanAnh}%'`);
    }
    if (tgPhanAnhFrom) {
      whereArray.push(`TGPhanAnh >= date'${queryHelper.formatDate(tgPhanAnhFrom)}`);
    }
    if (tgPhanAnhTo) {
      whereArray.push(`TGPhanAnh <= date'${queryHelper.formatDate(tgPhanAnhTo)}`);
    }
    if (linhVuc) {
      whereArray.push(`LinhVuc='${linhVuc}'`)
    }
    this.props.search(whereArray.join(' AND '));
  }

  private onClear() {
    this.setState({
      maSuCo: undefined,
      sdtNguoiPhanAnh: undefined,
      tgPhanAnhFrom: undefined,
      tgPhanAnhTo: undefined,
      linhVuc: undefined
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