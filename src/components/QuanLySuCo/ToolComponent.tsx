import * as React from 'react';
import BaseComponent from '../BaseComponent';

// Component
import Chart from './Tool/Chart';
import Searching from './Tool/Searching/index';
import ListComponent from './Tool/List/index';

import { Tabs, Tab, createStyles, WithStyles, withStyles, Theme, Badge } from '@material-ui/core';
import { TinhTrang } from '../../services/map/SuCo/model';
import { connect } from 'react-redux';
import { AllModelReducer } from '../../reducers';

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
    overflow: 'auto'
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },

});

enum TabIndex {
  List, Chart, Search
};


type StateToProps = {
  lengthMTN: number // số lượng sự cố mới tiếp nhận
};

type Props = {
}
  & StateToProps
  & WithStyles<typeof styles>;

type State = {
  tabIndex: number
};

class ToolComponent extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tabIndex: TabIndex.Chart };
  }
  render() {
    const { tabIndex } = this.state;
    const { classes, lengthMTN } = this.props;
    return <div className={classes.root}>
      <Tabs
        scrollable
        scrollButtons="auto"
        value={tabIndex}
        onChange={(e, newValue) => this.setState({ tabIndex: newValue })}
      >
        <Tab
          icon={
            <Badge className={classes.padding} color="secondary" badgeContent={lengthMTN}>
              <i className="fas fa-list-ol" />
            </Badge>
          } />
        <Tab icon={<i className="fas fa-chart-pie" />} />
        <Tab icon={<i className="fa fa-search" />} />
      </Tabs>
      {tabIndex === TabIndex.List &&
        <div className={classes.container}>
          <ListComponent />
        </div>
      }
      {tabIndex === TabIndex.Chart &&
        <div className={classes.container}>
          <Chart />
        </div>
      }
      {tabIndex === TabIndex.Search &&
        <div className={classes.container}>
          <Searching />
        </div>
      }

    </div>
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  lengthMTN: state.mapSuCo.items.filter(f => f.TinhTrang == TinhTrang.MoiTiepNhan).length
});

export default connect(mapStateToProps, null)(withStyles(styles)(ToolComponent));