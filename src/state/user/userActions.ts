import {constants} from '../constants';
import {
  IUser,
  IgetUserAtFbLogin,
  IgetUserAtLogin,
  IgetUserAtRegister,
  IlogoutUser,
  IsetUserSuccess,
  IsetUserClear,
  IsetUserWods,
  IuserWod,
} from './userInterface';

const getUserAtLogin = (email: string, password: string): IgetUserAtLogin => {
  return {
    type: constants.user.GET_USER_AT_LOGIN,
    payload: {email, password},
  };
};

const getUserAtRegister = (
  email: string,
  password: string,
  confirmPassword: string,
  userName: string,
  userSurname: string,
  setSubmitting: any,
): IgetUserAtRegister => {
  return {
    type: constants.user.GET_USER_AT_REGISTER,
    payload: {
      email,
      password,
      confirmPassword,
      userName,
      userSurname,
      setSubmitting,
    },
  };
};

const getUserAtFbLogin = (): IgetUserAtFbLogin => {
  return {
    type: constants.user.GET_USER_AT_FB_LOGIN,
  };
};

const logoutUser = (): IlogoutUser => {
  return {
    type: constants.user.LOGOUT_USER,
  };
};

const setUserSuccess = (user: IUser): IsetUserSuccess => {
  return {
    type: constants.user.SET_USER_SUCCESS,
    payload: user,
  };
};

const setUserClear = (): IsetUserClear => {
  return {
    type: constants.user.SET_USER_CLEAR,
  };
};

const setUserWods = (wods: IuserWod[]): IsetUserWods => {
  return {
    type: constants.user.SET_USER_WODS,
    payload: wods,
  };
};

export const userActions = {
  getUserAtLogin,
  getUserAtRegister,
  getUserAtFbLogin,
  logoutUser,
  setUserSuccess,
  setUserClear,
  setUserWods,
};
