import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

//Component
import DialogComponent from './DialogComponent';
import DetailsComponent from './DetailsComponent';
import SuCoThongTin from '../../../models/SuCoThongTin';

//REDUX
import { connect } from 'react-redux';
import { AllModelReducer } from '../../../reducers';
import { setThongTinChiTiet } from '../../../services/map/SuCo/action';

import * as moment from 'moment/moment';
import { Model } from '../../../services/map/SuCo/model';

const styles = createStyles({
  root: {

  }
});

type StateToProps = {
  suCoSelected?: Model
};

type DispatchToProps = {
  close: () => void
};

type Props = {

}
  & StateToProps
  & DispatchToProps
  & WithStyles<typeof styles>;

class ChiTietComponent extends React.Component<Props, {}>{
  render() {
    const { classes, suCoSelected } = this.props;
    if(!suCoSelected) return null;

    const open = suCoSelected != undefined;

    const title= `${suCoSelected.NVTiepNhan} tiếp nhận ${moment(new Date(suCoSelected.TGPhanAnh)).fromNow()}` 

    return <div className={classes.root}>
      <DialogComponent
        title={title}
        open={open}
        onClose={this.handleCloseDlg.bind(this)}
      >
        <DetailsComponent
          datas={ suCoSelected.SuCoThongTins || []}
        />
      </DialogComponent>
    </div>
  }

  private handleCloseDlg() {
    this.props.close();
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  suCoSelected: state.mapSuCo.modelSelected
});

export default connect(mapStateToProps, { close: setThongTinChiTiet })(withStyles(styles)(ChiTietComponent));