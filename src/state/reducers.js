import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import uiReducer from './ui/uiReducer';
import messagesReducer from './messages/messagesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  messages: messagesReducer,
});

export default rootReducer;
