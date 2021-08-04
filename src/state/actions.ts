import {userActions} from './user/userActions';
import {uiActions} from './ui/uiActions';
import {messagesActions} from './messages/messagesActions';
import {workoutsActions} from './workouts/workoutsActions';
import {wodsActions} from './wods/wodsActions';

export const actions = {
  user: userActions,
  ui: uiActions,
  messages: messagesActions,
  workouts: workoutsActions,
  wods: wodsActions,
};
