import { combineReducers } from 'redux';
import mainReducer, { Model as MainModel, defaultState as mainState } from '../services/main/reducer';
import mapReducer, {
  Model as MapModel, defaultState as mapState,
} from '../services/map/reducer';
import mapSuCoReducer, {
  Model as MapSuCoModel, defaultState as mapSuCoState,
} from '../services/map/SuCo/reducer';
import { connectRouter } from 'connected-react-router'
import { History } from 'history';

export type AllModelReducer = {
  main: MainModel,
  map: MapModel,
  mapSuCo: MapSuCoModel
};





export const initialState: AllModelReducer = {
  main: mainState,
  map: mapState,
  mapSuCo: mapSuCoState
};
const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  map: mapReducer,
  mapSuCo: mapSuCoReducer
});

export default reducers;
