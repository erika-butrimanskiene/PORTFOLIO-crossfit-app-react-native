import {constants} from '../constants';
import {messagesActionsType} from './messagesActions';

export interface IMessagesState {
  authErrorMsg: string;
  successMsg: string;
}

const initialMessagesState = {
  authErrorMsg: '',
  successMsg: '',
};

const messagesReducer = (
  state: IMessagesState = initialMessagesState,
  action: messagesActionsType,
) => {
  switch (action.type) {
    case constants.messages.SET_ERROR_MESSAGE:
      return {
        ...state,
        authErrorMsg: action.payload,
      };
    case constants.messages.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMsg: action.payload,
      };
    case constants.messages.CLEAR_MESSAGES:
      return {
        ...state,
        authErrorMsg: '',
        successMsg: '',
      };
    default:
      return state;
  }
};

export default messagesReducer;
