import {constants} from '../constants';
import {uiActionsType} from './uiActions';

export interface IUiState {
  authOnSync: boolean;
}

const initialUiState = {
  authOnSync: false,
};

const uiReducer = (state: IUiState = initialUiState, action: uiActionsType) => {
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
