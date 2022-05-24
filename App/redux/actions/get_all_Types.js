import {
  get_all_Types,
} from './types';

function get_all_Type(opacity) {
  return dispatch => {
    dispatch({type: get_all_Types, payload: opacity});
  };
}

export {get_all_Type};
