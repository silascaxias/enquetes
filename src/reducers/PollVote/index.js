import {SET_POLL, SET_SELECTED_ID} from '../../actions/PollVote/types';

const initialState = {
  poll: null,
  selectedID: null,
};

export const pollVoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLL:
      return {...state, poll: action.data};
    case SET_SELECTED_ID:
      return {...state, selectedID: action.data};
    default:
      return state;
  }
};

export default pollVoteReducer;
