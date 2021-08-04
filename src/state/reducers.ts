import {CombinedState, combineReducers} from 'redux';
import userReducer from './user/userReducer';
import uiReducer, {IUiState} from './ui/uiReducer';
import {IWorkoutsState} from './workouts/workoutsInterface';
import workoutsReducer from './workouts/workoutsReducer';
import messagesReducer, {IMessagesState} from './messages/messagesReducer';
import {IUserState} from './user/userInterface';
import {IWodsState} from './wods/wodsInterface';
import wodsReducer from './wods/wodsReducer';

export interface RootState {
  user: IUserState;
  ui: IUiState;
  messages: IMessagesState;
  workouts: IWorkoutsState;
  wods: IWodsState;
}

const rootReducer = combineReducers<CombinedState<RootState>>({
  user: userReducer,
  ui: uiReducer,
  messages: messagesReducer,
  workouts: workoutsReducer,
  wods: wodsReducer,
});

export default rootReducer;
