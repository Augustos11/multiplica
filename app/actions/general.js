import * as types from './types';

export function fnSaveInfoUser(objInfoUser){
    return (dispatch,getState) => {
        dispatch({
            type: types.SET_INFO_USER,
            objInfoUser
        });
    }
}