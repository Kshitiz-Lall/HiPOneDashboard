import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import dashboardSlice from './dashboardSlice';

const rootReducer = combineReducers({
  customization: customizationReducer,
  dashboard: dashboardSlice
});

export default rootReducer;
