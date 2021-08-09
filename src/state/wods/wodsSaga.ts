import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from '../actions';
import {constants} from '../constants';
import {IsetWodsList, IWodState} from './wodsInterface';
import {getUserWods} from '../../utils/getUserWods';
import auth from '@react-native-firebase/auth';

function* handleSetWodsList({payload}: IsetWodsList) {
  try {
    const user: any = auth().currentUser;
    const wodsList = getUserWods(payload, user._user.uid);
    yield put(actions.user.setUserWods(wodsList));
    console.log(wodsList);
  } catch (e) {
    console.log(e);
  }
}

export default function* wodsSaga() {
  yield takeLatest(constants.wods.SET_WODS_LIST, handleSetWodsList);
}
