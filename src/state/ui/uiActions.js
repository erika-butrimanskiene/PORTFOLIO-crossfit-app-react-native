import {constants} from '../constants';

const setOnSync = boolean => {
  return {
    type: constants.ui.SET_ON_SYNC,
    payload: boolean,
  };
};

export const uiActions = {
  setOnSync,
};
