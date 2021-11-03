import { combineReducers } from 'redux';
import * as reducerGeneral from './general';
export default combineReducers(Object.assign(
    reducerGeneral
));