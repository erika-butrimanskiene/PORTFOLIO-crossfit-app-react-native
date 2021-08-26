import {constants} from '../constants';
import {uiActionsType} from './uiActions';

export interface IUiState {
  onSync: boolean;
}

const initialUiState = {
  onSync: true,
};

const uiReducer = (state: IUiState = initialUiState, action: uiActionsType) => {
  switch (action.type) {
    case constants.ui.SET_ON_SYNC:
      return {
        ...state,
        onSync: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
