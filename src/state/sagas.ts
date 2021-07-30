import {all, fork} from 'redux-saga/effects';
import userSaga from './user/userSaga';
import workoutsSaga from './workouts/workoutsSaga';
import auth from '@react-native-firebase/auth';
import watchUser from './user/userWatcherSaga';
import watchWorkouts from './workouts/workoutsWatcherSaga';

export function* rootSaga() {
  yield all([fork(userSaga), fork(workoutsSaga)]);
  const user: any = auth().currentUser;
  if (user) {
    yield fork(watchUser, user._user.uid);
  }
  yield fork(watchWorkouts);
}
