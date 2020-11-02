import {SET_POLLS} from '../../actions/PollList/types';

const initialState = {
  pollsList: [],
};

export const pollListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLLS:
      return {pollsList: action.data};
    default:
      return state;
  }
};

export default pollListReducer;
