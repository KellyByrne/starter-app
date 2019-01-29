import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import Settings from './Settings';

const reducers = combineReducers({
  authentication,
  registration,
  users,
  alert,
  settings: Settings,
  routing: routerReducer,
});

export default reducers;