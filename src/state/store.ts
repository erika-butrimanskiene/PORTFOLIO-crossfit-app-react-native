import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {compact} from 'lodash';
import rootReducer from './reducers';
import {initReactotron} from '../utils/reactotron';
import {rootSaga} from './sagas';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

export const configStore = (initialState = {}) => {
  let sagaMonitor = undefined;
  let reactorEnhancer = undefined;
  if (true) {
    const Reactotron = initReactotron();
    sagaMonitor = Reactotron.createSagaMonitor();
    reactorEnhancer = Reactotron.createEnhancer();
    // console.tron = Reactotron;
  } else {
    // console.tron = {log: (): null => null, error: (): null => null};
  }
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const enhancers = compose(...compact([appliedMiddleware, reactorEnhancer]));

  //  const store = createStore(rootReducer, initialState, enhancers as any);
  const persistConfig = {
    key: 'persistedReducer',
    storage: AsyncStorage,
    blacklist: ['wods', 'user', 'ui', 'messages', 'workouts'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancers as any);

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};
