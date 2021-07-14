import {constants} from '../constants';

const getUser = (email, password, login) => {
  return {
    type: constants.user.GET_USER,
    payload: {email, password, login},
  };
};

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
const setUserClear = () => {
  return {
    type: constants.user.SET_USER_CLEAR,
  };
};

export const userActions = {
  getUser,
  initSetUser,
  setUserSuccess,
  setUserFailure,
  setUserClear,
};
