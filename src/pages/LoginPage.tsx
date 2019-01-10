import * as React from 'react';
import LoginComponent from '../components/LoginComponent';
import { User } from '../services/main/model';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Header from '../components/Header/LoginHeader';
import { connect } from 'react-redux';
import { login } from '../services/main/action';
type State = {
  user: User
};

type DispatchToProps = {
  login: (username: string, password: string) => void
};

type StateToProps = {
}

type Props = {
} & RouteComponentProps<null> & DispatchToProps & StateToProps;

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      },
    };
  }

  processForm(event: any) {
    event.preventDefault();

    const { username, password } = this.state.user;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  changeUser(event: any) {
    const field = event.target.name;
    const user = { ...this.state.user };
    user[field] = event.target.value;
    this.setState({
      user
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="login">
        <Header />
        <LoginComponent
          onSubmit={this.processForm.bind(this)}
          onChange={this.changeUser.bind(this)}
          user={user}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  login: (username: string, password: string) => dispatch(login(username, password))
});

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));
