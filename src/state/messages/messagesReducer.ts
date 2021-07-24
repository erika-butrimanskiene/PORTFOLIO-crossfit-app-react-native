import {constants} from '../constants';
import {messagesActionsType} from './messagesActions';

export interface IMessagesState {
  authErrorMsg: string;
  authSuccessMsg: string;
}

const initialMessagesState = {
  authErrorMsg: '',
  authSuccessMsg: '',
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
        authSuccessMsg: action.payload,
      };
    case constants.messages.CLEAR_MESSAGES:
      return {
        ...state,
        authErrorMsg: '',
        authSuccessMsg: '',
      };
    default:
      return state;
  }
};

export default messagesReducer;
