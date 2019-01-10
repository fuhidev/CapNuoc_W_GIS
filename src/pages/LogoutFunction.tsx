import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../services/main/action';
type DispatchToProps = {
  logout: () => void
};

type Props = {
} & RouteComponentProps<null> & DispatchToProps;

class LogoutFunction extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <p>Đang đăng xuất...</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(null, mapDispatchToProps)(LogoutFunction));
