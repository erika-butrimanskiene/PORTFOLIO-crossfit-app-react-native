import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from '../actions';
import {constants} from '../constants';
import {database} from '../../utils/database';

function* handleRegistration({
  payload: {email, password, confirmPassword, userName, userSurname, register},
}) {
  try {
    yield put(actions.ui.setOnSync(true));
    const response = yield call(register, email, password);
    yield put(actions.ui.setOnSync(false));
    if (response.status === true) {
      console.log(response);
      //create user in fireabase realtimeDB
      database
        .ref(`/users/${response.uid}`)
        .set({
          email: `${response.email}`,
          name: userName,
          surname: userSurname,
        })
        .then(() => console.log('Data set.'));
      yield put(actions.messages.clearMessages());
    }

    if (response.status === false) {
      throw response;
    }
  } catch (e) {
    console.log(e);
    switch (e.code) {
      case 'auth/account-exists-with-different-credential':
      case 'auth/credential-already-in-use':
      case 'auth/email-already-in-use':
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/weak-password':
        yield put(actions.messages.setErrorMessage(`${e.code}`));
        break;
      default:
        yield put(actions.messages.setErrorMessage('auth/unknown'));
    }
  }
}

function* handleLogin({payload: {email, password, login}}) {
  try {
    yield put(actions.ui.setOnSync(true));
    const response = yield call(login, email, password);
    yield put(actions.ui.setOnSync(false));

    if (response.status === true) {
      console.log(response);
      yield put(actions.messages.clearMessages());
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
        yield put(actions.messages.setErrorMessage(`${e.code}`));
        break;
      default:
        yield put(actions.messages.setErrorMessage('auth/unknown'));
    }
  }
}

function* handleLoginFacebook({payload: fbLogin}) {
  try {
    yield put(actions.ui.setOnSync(true));
    const response = yield call(fbLogin);
    yield put(actions.ui.setOnSync(false));
    if (response.status === true) {
      console.log(response);
    }

    if (response.status === false) {
      throw response;
    }
  } catch (e) {
    console.log(e);
    yield put(actions.messages.setErrorMessage(e.code)); //Error not display. Facebook reload page.
  }
}

function* handleLogout({payload: logout}) {
  try {
    yield put(actions.ui.setOnSync(true));
    const response = yield call(logout);
    yield put(actions.ui.setOnSync(false));
    if (response.status === true) {
      yield put(actions.user.setUserClear());
    }

    if (response.status === false) {
      throw response;
    }
  } catch (e) {
    yield put(actions.messages.setErrorMessage(e.code));
  }
}

export default function* userSaga() {
  yield takeLatest(constants.user.GET_USER_AT_LOGIN, handleLogin);
  yield takeLatest(constants.user.GET_USER_AT_REGISTER, handleRegistration);
  yield takeLatest(constants.user.GET_USER_AT_FB_LOGIN, handleLoginFacebook);
  yield takeLatest(constants.user.LOGOUT_USER, handleLogout);
}
