import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from '../actions';
import {constants} from '../constants';

function* handleLogin({payload: {email, password, login}}) {
  try {
    if (email === '' || password === '') {
      yield put(actions.user.setUserFailure('fieldsCanNotBeEmpty'));
      return;
    }

    yield put(actions.user.initSetUser());
    const response = yield call(login, email, password);
    console.log(response);
    if (response.status === true) {
      console.log(response);
      yield put(
        actions.user.setUserSuccess({
          email: response.email,
          uid: response.uid,
          id: '',
        }),
      );
      yield put(actions.user.setUserFailure('auth/reset-error'));
    }

    if (response.status === false) {
      throw response;
    }
  } catch (e) {
    console.log(e);
    switch (e.code) {
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        yield put(actions.user.setUserFailure(`${e.code}`));
        break;
      default:
        yield put(actions.user.setUserFailure('auth/unknown'));
    }
  }
}

export default function* userSaga() {
  yield takeLatest(constants.user.GET_USER, handleLogin);
}
