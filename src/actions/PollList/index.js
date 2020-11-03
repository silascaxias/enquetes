import {POLLS_LOADING, POLLS_SUCCESS, POLLS_ERROR} from './types';
import NetInfo from '@react-native-community/netinfo';
import api from '../../network/api';

export const fetchPolls = () => {
  return (dispatch, getState) => {
    dispatch(fetchPollsLoading());

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        dispatch(
          fetchPollsError('Erro ao conectar-se, verifique a sua conexão!'),
        );
        return;
      }

      api
        .get('/poll')
        .then((res) => {
          res.ok
            ? dispatch(fetchPollsSuccess(res.data))
            : dispatch(fetchPollsError(res.data.error));
        })
        .catch((err) => {
          dispatch(fetchPollsError(err.message));
        });
    });
  };
};

const fetchPollsSuccess = (polls) => ({
  type: POLLS_SUCCESS,
  data: polls,
});

const fetchPollsLoading = () => ({
  type: POLLS_LOADING,
});

const fetchPollsError = (error) => ({
  type: POLLS_ERROR,
  data: error,
});
