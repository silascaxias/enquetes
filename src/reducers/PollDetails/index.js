import {
  SET_POLL,
  POLL_STATS_LOADING,
  POLL_STATS_SUCCESS,
  POLL_STATS_ERROR,
} from '../../actions/PollDetails/types';

const initialState = {
  isLoading: false,
  poll: null,
  pollStats: null,
  error: null,
};

export const pollDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLL:
      return {...state, poll: action.data};
    case POLL_STATS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POLL_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        pollStats: action.data,
      };
    case POLL_STATS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };
    default:
      return state;
  }
};

export default pollDetailsReducer;
