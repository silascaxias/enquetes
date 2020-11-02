import {SET_POLL, SET_SELECTED_ID} from './types';

export const setPoll = (poll) => ({
  type: SET_POLL,
  data: poll,
});

export const setSelectedID = (id) => ({
  type: SET_SELECTED_ID,
  data: id,
});
