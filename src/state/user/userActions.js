import {constants} from '../constants';

const initSetUser = () => {
  return {
    type: constants.user.INIT_SET_USER,
  };
};
const setUserSuccess = user => {
  return {
    type: constants.user.SET_USER_SUCCESS,
    payload: user,
  };
};
const setUserFailure = error => {
  return {
    type: constants.user.SET_USER_FAILURE,
    payload: error,
  };
};

export const userActions = {
  initSetUser,
  setUserSuccess,
  setUserFailure,
};
