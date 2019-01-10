import * as React from 'react';
// import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import LogoutFunction from './LogoutFunction';
import PhieuCongTacPage from './PhieuCongTacPage';
import Auth from '../modules/Auth';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import routes, { Route as MyRoute } from '../modules/routers';
import * as api from '../apis/AccountApi';
type Props = {

};

type State = {
  authenticated: boolean,
  routes: MyRoute[]
};

type PrivateComponentProps = {
  Component: React.ComponentType<any>
  props: any,
  name: string,
  id: string,
  routes: MyRoute[]
};


class PrivateComponent extends React.Component<PrivateComponentProps, {}> {
  render() {
    const { Component, props, name, id, routes } = this.props;
    return (
      <Route {...props} render={_props => (
        Auth.isUserAuthenticated() ? (
          <Component id={id} name={name} routes={routes} />
        ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: _props.location }
            }} />
          )
      )}
      />
    );
  }
}

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authenticated: false,
      routes: []
    };
  }

  async toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    if (Auth.isUserAuthenticated()) {
      const rou = await this.update();
      this.setState({ routes: rou, authenticated: Auth.isUserAuthenticated() });
    } else {
      this.setState({ authenticated: Auth.isUserAuthenticated(), routes: [] });
    }
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      this.update().then(rou => this.setState({ routes: rou }));
    }
  }
  private async update() {
    const result = await api.profile();
    var rou: MyRoute[] = [];
    routes.forEach(f => {
      if (result.Capabilities.indexOf('w_' + f.id) !== -1) {
        rou.push(f);
      }
    });

    if (rou.length > 0 && !rou.some(s => s.props.path === '/')) {
      rou[0].props = { math: true, exact: true, path: '/' };
    }
    return rou;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {
              !Auth.isUserAuthenticated() &&
              <Route
                path="/"
                exact math
                render={props => (
                  <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
                )}
              />
            }
            {
              this.state.routes.map(m => <PrivateComponent
                key={m.id}
                routes={this.state.routes}
                id={m.id} name={m.name} Component={m.component} props={m.props} />)
            }
            <Route
              path="/login"
              render={props => (
                Auth.isUserAuthenticated() ? (
                  <Redirect
                    path="/login"
                    to={{
                      pathname: '/',
                      state: { from: props.location }
                    }}
                  />
                ) : (
                    <LoginPage toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
                  )
              )}
            />
            <Route path="/logout" component={LogoutFunction} />
            <Route path="/phieucongtac" component={PhieuCongTacPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch: Function) => ({

// });

// export default connect(null, mapDispatchToProps)(Index);
export default Index;
