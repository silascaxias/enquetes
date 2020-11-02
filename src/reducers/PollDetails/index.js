import {SET_POLL, SET_POLL_STATS} from '../../actions/PollDetails/types';

const initialState = {
  poll: null,
  pollStats: null,
};

export const pollDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLL:
      return {...state, poll: action.data};
    case SET_POLL_STATS:
      return {...state, pollStats: action.data};
    default:
      return state;
  }
};

export default pollDetailsReducer;
