import {constants} from '../constants';

const setOnSync = (boolean: boolean) => {
  return {
    type: constants.ui.SET_ON_SYNC,
    payload: boolean,
  };
};

export const uiActions = {
  setOnSync,
};

export type uiActionsType = ReturnType<typeof setOnSync>;
