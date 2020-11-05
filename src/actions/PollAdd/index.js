import {ADD_SUCCESS, ADD_ERROR, ADD_RESET_STATE} from './types';
import NetInfo from '@react-native-community/netinfo';
import api from '../../network/api';
import * as strings from '../../screens/PollAdd/strings';

export const sendPoll = (poll_description, options) => {
  return (dispatch) => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        return dispatch(
          addError('Erro ao conectar-se, verifique a sua conexão!'),
        );
      }
      if (poll_description === '') {
        return dispatch(addError(strings.withoutTitle));
      }
      if (options.length < 2) {
        return dispatch(addError(strings.withoutOptions));
      }

      const params = {
        poll_description: poll_description,
        options: options,
      };

      api
        .post('/poll', JSON.stringify(params))
        .then((res) => {
          res.ok ? dispatch(addSuccess()) : dispatch(addError(res.data.error));
        })
        .catch((err) => {
          dispatch(addError(err.message));
        });
    });
  };
};

export const addResetState = () => ({
  type: ADD_RESET_STATE,
});

const addSuccess = () => ({
  type: ADD_SUCCESS,
});

const addError = (error) => ({
  type: ADD_ERROR,
  data: error,
});
