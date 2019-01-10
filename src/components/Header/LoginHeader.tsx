import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center', padding: '10px 0 0 0',
  },
  logo: {
    width: 100, height: 100
  },
  title: {
    backgroundColor: 'rgb(255, 255, 255)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    lineHeight: 1.5,
    fontWeight: 700
  },
  titleMain: {
    color: theme.palette.primary.main,
    fontSize: 35
  },
  titleSub: {
    color: theme.palette.secondary.main,
    fontSize: 30,
    lineHeight: 0.6
  }
});

type Props = {

} & WithStyles<typeof styles>;

type States = {
  isOpenDrawer: boolean
};

class Header extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenDrawer: false
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <img
            className={classes.logo}
            src="/images/logo.png" alt="Logo" />
        </div>
        <div className={classes.title}>
          <div className={classes.titleMain}>
            CÔNG TY CỔ PHẦN CẤP NƯỚC VĨNH LONG
        </div>
          <div className={classes.titleSub}>
            <p>Ứng dụng GIS phục vụ công tác quản lý mạng lưới</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
