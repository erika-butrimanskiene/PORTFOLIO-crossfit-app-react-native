import {constants} from '../constants';

const setErrorMessage = errorMsg => {
  return {
    type: constants.messages.SET_ERROR_MESSAGE,
    payload: errorMsg,
  };
};

const setSuccessMessage = successMsg => {
  return {
    type: constants.messages.SET_SUCCESS_MESSAGE,
    payload: successMsg,
  };
};

const clearMessages = () => {
  return {
    type: constants.messages.CLEAR_MESSAGES,
  };
};

export const messagesActions = {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
};
