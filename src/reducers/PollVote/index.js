import {
  SET_POLL,
  VOTE_SUCCESS,
  VOTE_ERROR,
  RESET_STATE,
} from '../../actions/PollVote/types';

const initialState = {
  poll: null,
  error: null,
  response: null,
};

export const pollVoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLL:
      return {...state, poll: action.data};
    case VOTE_SUCCESS:
      return {
        ...state,
        error: null,
        response: true,
      };
    case VOTE_ERROR:
      return {
        ...state,
        error: action.data,
        response: false,
      }
    case RESET_STATE:
      return {
        ...state,
        error: null,
        response: null,
      };
    default:
      return state;
  }
};

export default pollVoteReducer;
