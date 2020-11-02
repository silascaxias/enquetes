import {SET_POLL, SET_POLL_STATS} from './types';

export const setPoll = (poll) => ({
  type: SET_POLL,
  data: poll,
});

export const setPollStats = (pollStats) => ({
  type: SET_POLL_STATS,
  data: pollStats,
});
