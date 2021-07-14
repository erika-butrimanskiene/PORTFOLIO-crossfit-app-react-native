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

function* handleRegistration({
  payload: {email, password, confirmPassword, userName, userSurname, register},
}) {
  try {
    console;
    if (
      userName === '' ||
      userSurname === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      yield put(actions.user.setUserFailure('fieldsCanNotBeEmpty'));
      return;
    }

    if (password.length < 6) {
      yield put(actions.user.setUserFailure('passwordLength'));
      return;
    }

    if (password !== confirmPassword) {
      yield put(actions.user.setUserFailure('passwordsNotMatch'));
      return;
    }

    yield put(actions.user.initSetUser());
    const response = yield call(register, email, password);

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
    switch (e.code) {
      case 'auth/account-exists-with-different-credential':
      case 'auth/credential-already-in-use':
      case 'auth/email-already-in-use':
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/weak-password':
        yield put(actions.user.setUserFailure(`${e.code}`));
        break;
      default:
        yield put(actions.user.setUserFailure('auth/unknown'));
    }
  }
}

function* handleLoginFacebook({payload: fbLogin}) {
  try {
    yield put(actions.user.initSetUser());
    const response = yield call(fbLogin);

    if (response.status === true) {
      console.log(response);
      yield put(
        actions.user.setUserSuccess({
          email: response.email,
          uid: response.uid,
          id: '',
        }),
      );
    }

    if (response.status === false) {
      throw response;
    }
  } catch (e) {
    console.log(e);
    yield put(actions.user.setUserFailure(e.code)); //Error not display. Facebook reload page.
  }
}

function* handleLogout({payload: logout}) {
  try {
    const response = yield call(logout);
    if (response.status === true) {
      yield put(actions.user.setUserClear());
    }

    if (response.status === false) {
      throw response;
    }
  } catch (e) {
    yield put(actions.user.setUserFailure(e.code));
  }
}

export default function* userSaga() {
  yield takeLatest(constants.user.GET_USER_AT_LOGIN, handleLogin);
  yield takeLatest(constants.user.GET_USER_AT_REGISTER, handleRegistration);
  yield takeLatest(constants.user.GET_USER_AT_FB_LOGIN, handleLoginFacebook);
  yield takeLatest(constants.user.LOGOUT_USER, handleLogout);
}
