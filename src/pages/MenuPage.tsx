import * as React from 'react';
import {
  createStyles, withStyles, WithStyles, Theme
}
  from '@material-ui/core';
import routes, { Route } from '../modules/routers';
import { Link } from 'react-router-dom';
import authService from '../services/api/AuthServices';
import { alertActions, loading } from '../actions';
import { connect } from 'react-redux';
import MSG from '../constants/MSG';
import BasePage,{PageProps} from './BasePage';

const COLORS = ['#b33939', '#218c74', '#33d9b2', '#ff793f', '#f1c40f', '#8e44ad', '#f39c12', '#3498db']

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    background: 'url("images/background.jpg") no-repeat center center fixed',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
    width: '100%',
    minHeight: '100vh'
  },
  titleContainer: {
    textAlign: 'center',
    padding: 10
  },
  logo: {
    width: 100, height: 100
  },
  title: {
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 700,
    textShadow: '2px 2px #9E9E9E',
    color: '#fff'
  },
  titleMain: {
    // color: theme.palette.primary.main,
    fontSize: 35
  },
  titleSub: {
    // color: theme.palette.secondary.main,
    fontSize: 30,
  },
  metroContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  metroItem: {
    width: 150,
    height: 150,
    backgroundColor: '#2196F3',
    textAlign: 'center',
    margin: 10,
    cursor: 'pointer',
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    },
    '& .inner': {
    },
    '& img': {
      width: 40,
      marginTop: 30
    },
    '& p': {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: `'Open Sans', sans-serif`
    }
  }
});

type States = {
  routes: Route[]
};

type DispatchToProps = {
  alert: (message: string) => void,
  loading: (show: boolean) => void
};

type Props = {

}
  & DispatchToProps
  & WithStyles<typeof styles>
  & PageProps;
class MenuPage extends BasePage<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { routes: [] };
  }

  async componentDidMount() {
    // lấy quyền để hiển thị chức năng
    try {
      this.props.loading(true);
      const profile = await authService.profile();
      const _routes = profile.Capabilities
        .map(m => routes.find(f => f.id === m.replace('w_', '')))
        .filter(f => f !== undefined) as Route[];
      this.setState({ routes: _routes });
    } catch (error) {
      this.props.alert(error || MSG.CO_LOI_XAY_RA);
    } finally {
      this.props.loading(false);
    }
  }

  private randomColor() {
    const index = Math.floor(Math.random() * (COLORS.length - 1));
    return COLORS[index];
  }

  render() {
    const { classes } = this.props;
    const { routes } = this.state;
    return <div className={classes.root}>
      <div className={classes.titleContainer}>
        <img
          className={classes.logo}
          src="/images/logo.png" alt="Logo" />
        <div className={classes.title}>
          <div className={classes.titleMain}>CÔNG TY CỔ PHẦN CẤP NƯỚC VĨNH LONG</div>
          <div className={classes.titleSub}>
            <p>
              Ứng dụng GIS phục vụ công tác quản lý mạng lưới
            </p>
          </div>
        </div>
      </div>
      <div className={classes.metroContainer}>
        {
          routes.map(m =>
            <Link
              key={m.id}
              to={m.props.path}
            >
              <div className={classes.metroItem}
                style={{ backgroundColor: this.randomColor() }}
              >
                <div className="inner">
                  <img src={m.avatar} alt={m.name} />
                  <p>{m.name}</p>
                </div>
              </div>
            </Link>
          )
        }
        <Link
          to="/logout"
        >
          <div className={classes.metroItem}
            style={{ backgroundColor: this.randomColor() }}
          >
            <div className="inner">
              <img src="/images/icons/logout.png" alt="Đăng xuất"/>
              <p>Đăng xuất</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  alert: (message: string) => dispatch(alertActions.error(message)),
  loading: (show: boolean) => show ? dispatch(loading.loadingReady()) : dispatch(loading.loadingFinish())
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(MenuPage));