import {call, put, takeLatest, fork} from 'redux-saga/effects';
import storage from '@react-native-firebase/storage';
import {actions} from '../actions';
import {constants} from '../constants';
import {database} from '../../utils/firebase/database';
import {
  register,
  login,
  fbLogin,
  logout,
  IFirebaseAuth,
} from '../../utils/firebase/firebaseAuthAPI';
import watchUser from './userWatcherSaga';
import watchWods from '../wods/wodsWatcherSaga';
import {AnyAction} from 'redux';

function* handleRegistration(action: {
  payload: {
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
    userSurname: string;
  };
  type: string;
}) {
  try {
    yield put(actions.ui.setOnSync(true));

    const response: IFirebaseAuth = yield call(
      register,
      action.payload.email,
      action.payload.password,
    );

    //yield put(actions.ui.setOnSync(false));

    if (response.status === true) {
      storage()
        .ref(`usersPhotos/defaultPhoto.png`)
        .getDownloadURL()
        .then(image => {
          database.ref(`/users/${response.uid}`).set({
            email: `${response.email}`,
            name: action.payload.userName,
            surname: action.payload.userSurname,
            imageUrl: image,
            admin: false,
          });
        });

      //create user in fireabase realtimeDB

      yield put(actions.messages.clearMessages());

      yield fork(watchUser, response.uid);
      yield fork(watchWods);
    }

    if (response.status === false) {
      yield put(actions.ui.setOnSync(false));
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

function* handleLogin({payload: {email, password}}: AnyAction) {
  try {
    yield put(actions.ui.setOnSync(true));

    const response: IFirebaseAuth = yield call(login, email, password);

    //yield put(actions.ui.setOnSync(false));

    if (response.status === true) {
      yield put(actions.messages.clearMessages());
      yield fork(watchUser, response.uid);
      yield fork(watchWods);
    }
    if (response.status === false) {
      yield put(actions.ui.setOnSync(false));
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

function* handleLoginFacebook() {
  try {
    yield put(actions.ui.setOnSync(true));

    const response: IFirebaseAuth = yield call(fbLogin);

    if (response.status === true) {
      database
        .ref(`/users/${response.uid}`)
        .set({
          email: `${response.email}`,
          name: `${response.name}`,
          surname: `${response.surname}`,
          imageUrl: `${response.imageUrl}`,
          admin: false,
        })
        .then(yield fork(watchUser, response.uid));

      yield fork(watchWods);
    }

    if (response.status === false) {
      yield put(actions.ui.setOnSync(false));
      throw response;
    }
  } catch (e) {
    console.log(e);
    yield put(actions.messages.setErrorMessage(e.code));
  }
}

function* handleLogout() {
  try {
    yield put(actions.ui.setOnSync(true));
    const response: IFirebaseAuth = yield call(logout);
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
