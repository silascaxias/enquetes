import {SET_POLLS} from './types';

export const setPolls = (polls) => ({
  type: SET_POLLS,
  data: polls,
});
