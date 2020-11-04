import {
  SET_POLL,
  POLL_STATS_LOADING,
  POLL_STATS_SUCCESS,
  POLL_STATS_ERROR,
} from './types';

import NetInfo from '@react-native-community/netinfo';
import api from '../../network/api';

export const fetchPollStats = (poll_id) => {
  return (dispatch) => {
    dispatch(fetchPollStatsLoading());

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        dispatch(
          fetchPollStatsError('Erro ao conectar-se, verifique a sua conexão!'),
        );
        return;
      }

      api
        .get(`/poll/${poll_id}/stats`)
        .then((res) => {
          res.ok
            ? dispatch(fetchPollStatsSuccess(res.data))
            : dispatch(fetchPollStatsError(res.data.Message));
        })
        .catch((err) => {
          dispatch(fetchPollStatsError(err.message));
        });
    });
  };
};

export const setPollDetails = (poll) => ({
  type: SET_POLL,
  data: poll,
});

const fetchPollStatsSuccess = (pollStats) => ({
  type: POLL_STATS_SUCCESS,
  data: pollStats,
});

const fetchPollStatsLoading = () => ({
  type: POLL_STATS_LOADING,
});

const fetchPollStatsError = (error) => ({
  type: POLL_STATS_ERROR,
  data: error,
});
