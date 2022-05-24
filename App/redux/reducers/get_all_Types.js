import {
  get_all_Types
} from '../actions/types';

const INITIAL_MESSAGE = {
  types: {
    deckSurface: [],
    flashing: [],
    framing: [],
    railing: [],
    stairs: []
  },
};

const appStateReducer = (state = INITIAL_MESSAGE, action) => {
  switch (action.type) {
    case get_all_Types:{
      if(action.payload.railing){
        state = Object.assign({}, state, { types: action.payload });
      }
      return state;
}
    default:
      return state;
  }
};

export default appStateReducer;
