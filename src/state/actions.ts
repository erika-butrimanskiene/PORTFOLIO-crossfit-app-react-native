import {userActions} from './user/userActions';
import {uiActions} from './ui/uiActions';
import {messagesActions} from './messages/messagesActions';

export const actions = {
  user: userActions,
  ui: uiActions,
  messages: messagesActions,
};
