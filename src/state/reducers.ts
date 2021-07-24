import {CombinedState, combineReducers} from 'redux';
import userReducer from './user/userReducer';
import uiReducer, {IUiState} from './ui/uiReducer';
import messagesReducer, {IMessagesState} from './messages/messagesReducer';
import {IUserState} from './user/userInterface';

export interface RootState {
  user: IUserState;
  ui: IUiState;
  messages: IMessagesState;
}

const rootReducer = combineReducers<CombinedState<RootState>>({
  user: userReducer,
  ui: uiReducer,
  messages: messagesReducer,
});

export default rootReducer;
