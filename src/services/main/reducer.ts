import { LoadingActionType, AuthActionType, AlertActionType } from '../../actions/action-types';
import Auth from '../../modules/Auth';
import { UserResponse } from './user/model';
import MainAction from './EAction';
import { Alert } from './model';

export type Model = {
  loading: boolean,
  loggingIn: boolean,
  user?: UserResponse,
  isShowLoadingPage: boolean
  alert: Alert,
};

const loggingIn = Auth.isUserAuthenticated();
let user;
if (loggingIn) {
  user = Auth.getUser();
}

export const defaultState: Model = {
  loading: false,
  isShowLoadingPage: false,
  loggingIn,
  user,
  alert: {},
};


function reducer(state: Model = defaultState, action: MainAction): Model {
  switch (action.type) {
    case LoadingActionType.LOAD:
      return { ...state, loading: true };
    case LoadingActionType.ENDLOAD:
      return { ...state, loading: false };
    case AlertActionType.SUCCESS:
      return {
        ...state, alert: {
          type: 'success', message: action.message
        }
      };
    case AlertActionType.INFO:
      return {
        ...state, alert: {
          type: 'info', message: action.message
        }
      };
    case AlertActionType.WARNING:
      return {
        ...state, alert: {
          type: 'warning', message: action.message
        }
      };
    case AlertActionType.ERROR:
      return {
        ...state, alert: {
          type: 'error', message: action.message
        }
      };
    case AlertActionType.CLEAR:
      return {
        ...state, alert: {
          type: undefined, message: undefined
        }
      };
    case AuthActionType.LOGIN_REQUEST:
      return { ...state };
    case AuthActionType.LOGIN_SUCCESS:
      return { ...state, loggingIn: true, user: action.user };
    case AuthActionType.LOGIN_FAILURE:
      return { ...state, loggingIn: false, user: undefined };
    case AuthActionType.LOGOUT:
      return { ...state, loggingIn: false, user: undefined };
    case LoadingActionType.LOADINGPAGE_DISPLAY:
      return { ...state, isShowLoadingPage: true };
    case LoadingActionType.LOADINGPAGE_HIDE:
      return { ...state, isShowLoadingPage: false };
    default:
      return state;
  }
}

export default reducer;