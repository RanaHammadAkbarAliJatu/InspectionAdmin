import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { get_all_Types_api } from './../helper/api';
import { get_all_Type } from './actions/get_all_Types';

export default createStore(reducer, applyMiddleware(thunk));
// later
export function getAllTypes(token) {
    // The `extraArgument` is the third arg for thunk functions
    return (dispatch, getState, api) => {
        get_all_Types_api(token).then(response => {
            console.log(response,"get_all_Types")
            if (response?.status === 200) {
              dispatch(get_all_Type(response.data))
            }
            else{
              alert("Some thing Went Wrong")
            }
          });
    }
  }