import {constants} from '../constants';

const getUserAtLogin = (email, password, login) => {
  return {
    type: constants.user.GET_USER_AT_LOGIN,
    payload: {email, password, login},
  };
};

const getUserAtRegister = (
  email,
  password,
  confirmPassword,
  userName,
  userSurname,
  register,
) => {
  return {
    type: constants.user.GET_USER_AT_REGISTER,
    payload: {
      email,
      password,
      confirmPassword,
      userName,
      userSurname,
      register,
    },
  };
};

const getUserAtFbLogin = fbLogin => {
  return {
    type: constants.user.GET_USER_AT_FB_LOGIN,
    payload: fbLogin,
  };
};

const logoutUser = logout => {
  return {
    type: constants.user.LOGOUT_USER,
    payload: logout,
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
  getUserAtLogin,
  getUserAtRegister,
  getUserAtFbLogin,
  logoutUser,
  initSetUser,
  setUserSuccess,
  setUserFailure,
  setUserClear,
};
