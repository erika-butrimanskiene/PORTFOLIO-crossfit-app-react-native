import {constants} from '../constants';

const initialUiState = {
  authOnSync: false,
};

const uiReducer = (state = initialUiState, action) => {
  switch (action.type) {
    case constants.ui.SET_ON_SYNC:
      return {
        ...state,
        authOnSync: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
