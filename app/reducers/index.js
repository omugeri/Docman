import { combineReducers } from 'redux';
import menu from './menuReducers';
import display from './displayReducers';
import auth from './authReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  menu,
  display,
  auth,
  search,
});

export default rootReducer;
