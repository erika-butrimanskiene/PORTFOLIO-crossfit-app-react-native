import {constants} from '../constants';

const initialMessagesState = {
  authErrorMsg: '',
  authSuccessMsg: '',
};

const messagesReducer = (state = initialMessagesState, action) => {
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
