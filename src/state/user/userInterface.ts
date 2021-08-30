import {IWodTime} from '../wods/wodsInterface';

export interface IUser {
  uid?: string;
  email?: string;
  name?: string;
  surname?: string;
  imageUrl?: string;
  admin?: boolean;
}

export interface IsetUserSuccess {
  type: string;
  payload: IUser;
}

export interface IUserState {
  user: IUser;
  userWods: IuserWod[];
}

export interface IgetUserAtLoginPayload {
  email: string;
  password: string;
}

export interface IgetUserAtLogin {
  type?: string;
  payload: IgetUserAtLoginPayload;
}

export interface IhandleRegistrationPayload {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  userSurname: string;
  setSubmitting?: any;
}

export interface IgetUserAtRegister {
  type?: string;
  payload: IhandleRegistrationPayload;
}

export interface IgetUserAtFbLogin {
  type: string;
  payload?: null;
}

export interface IlogoutUser {
  type: string;
  payload?: null;
}

export interface IsetUserClear {
  type: string;
  payload?: null;
}

export interface IsetUserWods {
  type: string;
  payload: IuserWod[];
}
export interface IuserWod {
  wodType: string;
  wodDate: string;
  wodTimes: IWodTime[];
  workoutId: string;
  workoutName: string;
  workoutType: string;
}

export type userActionsType =
  | IgetUserAtFbLogin
  | IgetUserAtLogin
  | IgetUserAtRegister
  | IlogoutUser
  | IsetUserSuccess
  | IsetUserClear
  | IsetUserWods;
