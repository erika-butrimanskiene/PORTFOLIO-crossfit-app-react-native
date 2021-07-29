import {CombinedState, combineReducers} from 'redux';
import userReducer from './user/userReducer';
import uiReducer, {IUiState} from './ui/uiReducer';
import workoutsReducer, {IWorkoutsState} from './workouts/workoutsReducer';
import messagesReducer, {IMessagesState} from './messages/messagesReducer';
import {IUserState} from './user/userInterface';

export interface RootState {
  user: IUserState;
  ui: IUiState;
  messages: IMessagesState;
  workouts: IWorkoutsState;
}

const rootReducer = combineReducers<CombinedState<RootState>>({
  user: userReducer,
  ui: uiReducer,
  messages: messagesReducer,
  workouts: workoutsReducer,
});

export default rootReducer;
