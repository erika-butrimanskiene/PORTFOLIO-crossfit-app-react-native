import {database} from '../../utils/database';
import {EventChannel, eventChannel} from 'redux-saga';
import {call, take, put} from 'redux-saga/effects';
import {actions} from '../actions';
import {convertWodsObjectToArray} from '../../utils/firebaseDatabaseAPI';

import {IWodState} from './wodsInterface';

const wodsChannel = () => {
  return eventChannel(emit => {
    const firebaseDatabase = database.ref(`WODs`);
    firebaseDatabase.on(
      'value',
      snapshot => {
        emit({wods: snapshot.val()});
      },
      errorObject => {
        console.log(errorObject);
      },
    );
    return () => firebaseDatabase.off();
  });
};

export default function* watchWods() {
  const channel: EventChannel<unknown> = yield call(wodsChannel);
  try {
    while (true) {
      const {wods} = yield take(channel);
      console.log('wods are updated by watcher');
      const wodsArray: IWodState[] = yield call(convertWodsObjectToArray, wods);
      if (wods) {
        yield put(actions.wods.setWodsList(wodsArray));
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    channel.close();
  }
}
