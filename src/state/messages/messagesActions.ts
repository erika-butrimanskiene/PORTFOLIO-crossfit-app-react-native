import {constants} from '../constants';

export interface IsetErrorMessage {
  type: string;
  payload: string;
}

export interface IsetSuccessMessage {
  type: string;
  payload: string;
}

export interface IclearMessages {
  type: string;
  payload?: null;
}

const setErrorMessage = (errorMsg: string): IsetErrorMessage => {
  return {
    type: constants.messages.SET_ERROR_MESSAGE,
    payload: errorMsg,
  };
};

const setSuccessMessage = (successMsg: string): IsetSuccessMessage => {
  return {
    type: constants.messages.SET_SUCCESS_MESSAGE,
    payload: successMsg,
  };
};

const clearMessages = (): IclearMessages => {
  return {
    type: constants.messages.CLEAR_MESSAGES,
  };
};

export const messagesActions = {
  setErrorMessage,
  setSuccessMessage,
  clearMessages,
};

export type messagesActionsType =
  | IsetErrorMessage
  | IsetSuccessMessage
  | IclearMessages;
