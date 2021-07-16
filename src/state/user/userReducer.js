import {constants} from '../constants';

const initialUserState = {
  user: {},
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case constants.user.SET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case constants.user.SET_USER_CLEAR:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
