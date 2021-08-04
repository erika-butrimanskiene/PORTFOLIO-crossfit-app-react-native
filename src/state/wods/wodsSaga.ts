import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from '../actions';
import {constants} from '../constants';
import {getWods} from '../../utils/firebaseDatabaseAPI';
import {IWodState} from './wodsInterface';

function* handleGetWods() {
  try {
    let dataArray: IWodState[] = yield call(getWods);
    yield put(actions.wods.setWodsList(dataArray));
  } catch (e) {
    console.log(e);
  }
}

export default function* wodsSaga() {
  yield takeLatest(constants.wods.GET_WODS_LIST, handleGetWods);
}
