import * as React from 'react';
import LoginComponent from '../components/LoginComponent';
import User from '../models/User';
import Auth from '../modules/Auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { login } from '../apis/api';
import Header from '../components/Header/LoginHeader';
import { LinearProgress } from 'material-ui';
type State = {
  user: User
  errors: string
  successMessage: string,
  isLoading: boolean,
};

type Props = {
  toggleAuthenticateStatus: () => Promise<any>
} & RouteComponentProps<null>;

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      user: {
        username: '',
        password: ''
      },
      errors: '',
      successMessage,
      isLoading: false
    };
  }

  processForm(event: any) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.setState({
      isLoading: true
    });

    // create a string for an HTTP body message
    const { username, password } = this.state.user;

    login(username, password)
      .then((token: string) => {
        Auth.authenticateUser(token);
        Auth.setUsername(username);

        // update authenticated state
        this.props.toggleAuthenticateStatus()
          .then(() => this.props.history.push('/'));
      })
      .catch((e: any) => {
        if (e.responseJSON.Message) {
          this.setState({
            errors: e.responseJSON.Message,
            isLoading: false
          });
        }
      });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event: any) {
    const field = event.target.name;
    const user = { ...this.state.user };
    user[field] = event.target.value;
    this.setState({
      user
    });
  }
  render() {
    const { errors, isLoading, successMessage, user } = this.state;
    return (
      <div className="login">
        {isLoading && <LinearProgress />}
        <Header />
        <LoginComponent
          onSubmit={this.processForm.bind(this)}
          onChange={this.changeUser.bind(this)}
          errors={errors}
          successMessage={successMessage}
          user={user}
        />
      </div>
    );
  }
}

export default withRouter(LoginPage);
