import * as React from 'react';
import {
  AppBar, Toolbar, IconButton,
  Typography, Menu, MenuItem,
  WithStyles, withStyles, Drawer, ListItem, ListItemText, Divider, createStyles,

} from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import routes from '../../modules/routers';
import { AllModelReducer } from '../../reducers';
import { connect } from 'react-redux';
import version from '../../modules/version';
import { logout } from '../../services/main/action';

const MyDrawer = (props: { isOpenDrawer: boolean, onClose: () => void }) => (
  <Drawer open={props.isOpenDrawer} onClose={props.onClose}>
    <div
      tabIndex={0}
      role="button"
      onClick={props.onClose}
      onKeyDown={props.onClose}
    >
      {routes.map(m => (
        <Link key={m.id} to={m.props.path}>
          <ListItem button>
            <ListItemText primary={m.name} />
          </ListItem>
        </Link>
      ))}
      <Divider />
      <Typography variant="subtitle1">
        Phiên bản: {version.getVersion()}
      </Typography>
    </div>
  </Drawer>
);

type StateToProps = {
  displayName: string,
};

type DispatchToProps = {
  logout: () => void
};

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  displayName: {
    marginRight: 5
  }
});

type Props = {
} & RouteComponentProps<null> & DispatchToProps & StateToProps
  & WithStyles<typeof styles>;

type States = {
  isOpenDrawer: boolean,
  anchorEl?: HTMLElement
};

class Header extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenDrawer: false
    };
  }

  private getTitle(): string {
    let title = '';
    const { location } = this.props;
    var route = routes.find(f => f.props.path.startsWith(location.pathname));
    if (route) {
      title = route.name;
    }
    return title;
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({
      isOpenDrawer: open
    });
  };

  render() {
    const { displayName, classes } = this.props;
    const { anchorEl, isOpenDrawer } = this.state;
    const title = this.getTitle();
    const open = Boolean(anchorEl);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            // onClick={this.toggleDrawer(true)}
            >
              <Link to="/" style={{ color: '#fff' }}>
                <MenuIcon />
              </Link>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              {title}
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Typography
                  className={classes.displayName}
                  variant="button"
                  color="inherit"
                  noWrap
                >
                  {displayName}
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <ListItemText>Đổi mật khẩu</ListItemText>
                </MenuItem>
                <Link to="/logout">
                  <MenuItem><ListItemText>Đăng xuất</ListItemText></MenuItem>
                </Link>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <MyDrawer isOpenDrawer={isOpenDrawer} onClose={this.toggleDrawer(false)} />
      </div>
    );
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  displayName: state.main.user ? state.main.user.displayname : ''
});
const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));
