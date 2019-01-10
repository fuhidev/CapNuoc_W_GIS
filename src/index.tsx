import './modules/mapConfig';

// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import AppPage from './pages/App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import createRootReducer, { initialState } from './reducers';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'

// App
import { version } from './appconfig'; 
import versionmanager from './modules/version';
import Auth from './modules/Auth';
import * as moment from 'moment/moment';

import './css/index.scss';

moment.locale('vi');
// LOGGING
// Sentry.init({
//   dsn: "https://ba38334919274e11a7e384cf4528de70@sentry.io/1365472"
//  });


// VERSION
if (!versionmanager.equalVersion(version)) {
  Auth.deauthenticateUser();
  versionmanager.setVersion(version);
};

//MUI THEME
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#16a085'
    },
    secondary: {
      main: '#27ae60'
    }
  },
  typography: {
    useNextVariants: true,
  },
});

// ROUTER
const history = createBrowserHistory();

//REDUX
const store = createStore(
  createRootReducer(history), // root reducer with router state
  initialState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware, loggerMiddleware
    ),
  ),
)

//RENDER
try {
  ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <MuiThemeProvider theme={theme}>
      <AppPage />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
  ,
  document.querySelector('#root'));

} catch (error) {
  alert('e')
  // Sentry.withScope(scope => {
  //   Object.keys(error).forEach(key => {
  //     scope.setExtra(key, error[key]);
  //   });
  //   Sentry.captureException(error);
  // });
}
