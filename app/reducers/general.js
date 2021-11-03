import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const objInfoUser = createReducer({}, {
  [types.SET_INFO_USER](state, action){
    let newState = {};
    newState = action.objInfoUser;
    return newState;
  }
});