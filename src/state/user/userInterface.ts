export interface IUser {
  uid?: string;
  email?: string;
  name?: string;
  surname?: string;
  admin?: boolean;
}

export interface IsetUserSuccess {
  type: string;
  payload: IUser;
}

export interface IUserState {
  user: IUser;
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

export type userActionsType =
  | IgetUserAtFbLogin
  | IgetUserAtLogin
  | IgetUserAtRegister
  | IlogoutUser
  | IsetUserSuccess
  | IsetUserClear;
