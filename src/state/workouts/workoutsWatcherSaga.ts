import {database} from '../../utils/firebase/database';
import {EventChannel, eventChannel} from 'redux-saga';
import {call, take, put} from 'redux-saga/effects';
import {actions} from '../actions';
import {convertWorkoutsObjectToArray} from '../../utils/firebase/firebaseDatabaseAPI';
import {IWorkoutState} from './workoutsInterface';

const workoutsChannel = () => {
  return eventChannel(emit => {
    const firebaseDatabase = database.ref(`workouts`);
    firebaseDatabase.on(
      'value',
      snapshot => {
        emit({workouts: snapshot.val()});
      },
      errorObject => {
        console.log(errorObject);
      },
    );
    return () => firebaseDatabase.off();
  });
};

export default function* watchWorkouts() {
  const channel: EventChannel<unknown> = yield call(workoutsChannel);
  try {
    while (true) {
      const {workouts} = yield take(channel);
      console.log('workouts are updated by watcher');

      const workoutsArray: IWorkoutState[] =
        convertWorkoutsObjectToArray(workouts);

      if (workouts) {
        yield put(actions.workouts.setWorkoutsList(workoutsArray));
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    channel.close();
  }
}
