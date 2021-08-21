import {database} from '../../utils/firebase/database';
import {EventChannel, eventChannel} from 'redux-saga';
import {call, take, put} from 'redux-saga/effects';
import {actions} from '../actions';

const usersChannel = (uid: string) => {
  return eventChannel(emit => {
    const firebaseDatabase = database.ref(`users/${uid}`);
    firebaseDatabase.on(
      'value',
      snapshot => {
        emit({user: snapshot.val()});
      },
      errorObject => {
        console.log(errorObject);
      },
    );
    return () => firebaseDatabase.off();
  });
};

export default function* watchUser(uid: string) {
  const channel: EventChannel<unknown> = yield call(usersChannel, uid);
  try {
    while (true) {
      const {user} = yield take(channel);
      // do something with the update user info
      // e.g.
      console.log('user is updated by watcher');
      if (user) {
        yield put(
          actions.user.setUserSuccess({
            name: user.name,
            surname: user.surname,
            email: user.email,
            uid: uid,
            imageUrl: user.imageUrl,
            admin: user.admin,
          }),
        );
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    channel.close();
  }
}
