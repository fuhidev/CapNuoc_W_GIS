import { LoadingActionType, AlertActionType } from './action-types';
import UserEAction from './user/EAction';
type MainAction =
  { type: LoadingActionType.LOAD }
  | { type: LoadingActionType.ENDLOAD }
  | { type: AlertActionType.SUCCESS, message: string }
  | { type: AlertActionType.ERROR, message: string }
  | { type: AlertActionType.INFO, message: string }
  | { type: AlertActionType.WARNING, message: string }
  | { type: AlertActionType.CLEAR }
  | { type: LoadingActionType.ENDLOAD }
  | { type: LoadingActionType.LOADINGPAGE_DISPLAY }
  | { type: LoadingActionType.LOADINGPAGE_HIDE }
  | UserEAction

export default MainAction;