import {combineReducers} from 'redux';
import userReducer from './user';
import appState from './appState';
import get_all_Types from './get_all_Types';

const reducer = combineReducers({
  user: userReducer,
  appState: appState,
  get_all_Types: get_all_Types
});
export default reducer;
