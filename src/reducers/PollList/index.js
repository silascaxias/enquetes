import {
  POLLS_LOADING,
  POLLS_SUCCESS,
  POLLS_ERROR,
} from '../../actions/PollList/types';

const initialState = {
  isLoading: false,
  pollsList: [],
  error: null,
};

export default function pollListReducer(state = initialState, action) {
  switch (action.type) {
    case POLLS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POLLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        pollsList: action.data,
      };
    case POLLS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };
    default:
      return state;
  }
}
