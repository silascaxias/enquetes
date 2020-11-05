import {
  ADD_SUCCESS,
  ADD_ERROR,
  ADD_RESET_STATE,
} from '../../actions/PollAdd/types';

const initialState = {
  error: null,
  response: null,
};

export const pollAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUCCESS:
      return {
        error: null,
        response: true,
      };
    case ADD_ERROR:
      return {
        error: action.data,
        response: false,
      };
    case ADD_RESET_STATE:
      return {
        error: null,
        response: null,
      };
    default:
      return state;
  }
};

export default pollAddReducer;
