import {constants} from '../constants';

const initialUserState = {
  onSync: false,
  user: {},
  error: '',
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case constants.user.INIT_SET_USER:
      return {
        ...state,
        onSync: true,
      };
    case constants.user.SET_USER_SUCCESS:
      return {
        ...state,
        onSync: false,
        user: action.payload,
      };
    case constants.user.SET_USER_FAILURE:
      return {
        ...state,
        onSync: false,
        error: action.payload,
      };
    case constants.user.SET_USER_CLEAR:
      return {
        ...state,
        onSync: false,
        user: {},
        error: '',
      };
    default:
      return state;
  }
};

export default userReducer;
