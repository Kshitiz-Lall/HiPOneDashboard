import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import automationReducer from './postman'; // Adjust the path accordingly
import dashboardSlice from './dashboardSlice';

const rootReducer = combineReducers({
  customization: customizationReducer,
  automation: automationReducer,
  dashboard: dashboardSlice
});

export default rootReducer;
