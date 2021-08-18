import {all, fork} from 'redux-saga/effects';
import userSaga from './user/userSaga';
import workoutsSaga from './workouts/workoutsSaga';
import wodsSaga from './wods/wodsSaga';
import auth from '@react-native-firebase/auth';
import watchUser from './user/userWatcherSaga';
import watchWorkouts from './workouts/workoutsWatcherSaga';
import watchWods from './wods/wodsWatcherSaga';

export function* rootSaga() {
  yield all([fork(userSaga), fork(workoutsSaga), fork(wodsSaga)]);
  const user: any = auth().currentUser;
  if (user) {
    yield fork(watchUser, user._user.uid);
    yield fork(watchWods);
  }
  yield fork(watchWorkouts);
}
