import { combineReducers } from 'redux';
import menu from './menuReducers';
import display from './displayReducers';
import auth from './authReducer';

const rootReducer = combineReducers({
  menu,
  display,
  auth,
});

export default rootReducer;
