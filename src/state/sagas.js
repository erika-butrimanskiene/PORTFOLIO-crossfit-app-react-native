import {all, fork} from 'redux-saga/effects';
import userSaga from './user/userSaga';
import auth from '@react-native-firebase/auth';
import watchUser from './user/userWatcherSaga';

export function* rootSaga() {
  yield all([fork(userSaga)]);
  const user = auth().currentUser;
  if (user) {
    yield fork(watchUser, user._user.uid);
  }
}
