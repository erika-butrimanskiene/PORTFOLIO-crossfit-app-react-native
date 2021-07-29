import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from '../actions';
import {constants} from '../constants';
import {getWorkouts} from '../../utils/firebaseDatabaseAPI';

function* handleGetWorkouts() {
  try {
    let dataArray: object[] = yield call(getWorkouts);
    yield put(actions.workouts.setWorkoutsList(dataArray));
  } catch (e) {
    console.log(e);
  }
}

export default function* workoutsSaga() {
  yield takeLatest(constants.workouts.GET_WORKOUTS_LIST, handleGetWorkouts);
}
