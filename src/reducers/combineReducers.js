import { combineReducers } from 'redux';
import rootReducer from './rootReducer';

const allReducers = combineReducers({
  server: rootReducer,
});

export default allReducers;
