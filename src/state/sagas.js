import {all, fork} from 'redux-saga/effects';
import userSaga from './user/userSaga';

export function* rootSaga() {
  yield all([fork(userSaga)]);
}
