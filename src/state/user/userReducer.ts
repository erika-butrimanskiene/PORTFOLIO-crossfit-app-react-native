import {constants} from '../constants';
import {IuserWod} from '../wods/wodsInterface';
import {IUser, IUserState, userActionsType} from './userInterface';

const initialUserState: IUserState = {
  user: {},
  userWods: [],
};

const userReducer = (
  state: IUserState = initialUserState,
  action: userActionsType,
) => {
  switch (action.type) {
    case constants.user.SET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload as IUser,
      };
    case constants.user.SET_USER_CLEAR:
      return {
        ...state,
        user: {},
      };
    case constants.user.SET_USER_WODS:
      return {
        ...state,
        userWods: action.payload as IuserWod[],
      };
    default:
      return state;
  }
};

export default userReducer;
