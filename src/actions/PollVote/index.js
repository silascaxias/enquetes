import {SET_POLL, VOTE_SUCCESS, VOTE_ERROR, RESET_STATE} from './types';
import NetInfo from '@react-native-community/netinfo';
import api from '../../network/api';

export const setPollVote = (poll) => ({
  type: SET_POLL,
  data: poll,
});

export const sendVote = (poll_id, selectedID) => {
  return (dispatch) => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        return dispatch(
          voteError('Erro ao conectar-se, verifique a sua conexão!'),
        );
      }
      if (selectedID == null) {
        return dispatch(voteError('Selecione uma opção!'));
      }

      api
        .post(`/poll/${poll_id}/vote`, {
          option_id: selectedID,
        })
        .then((res) => {
          res.ok
            ? dispatch(voteSuccess())
            : dispatch(voteError(res.data.error));
        })
        .catch((err) => {
          dispatch(voteError(err.message));
        });
    });
  };
};

export const resetState = () => ({
  type: RESET_STATE,
})

const voteSuccess = () => ({
  type: VOTE_SUCCESS,
});

const voteError = (error) => ({
  type: VOTE_ERROR,
  data: error,
});
