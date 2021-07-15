import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {compact} from 'lodash';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';
import {initReactotron} from '../utils/reactotron';
import {rootSaga} from './sagas';

export const configStore = (initialState = {}) => {
  let sagaMonitor = undefined;
  let reactorEnhancer = undefined;
  if (true) {
    const Reactotron = initReactotron(true);
    sagaMonitor = Reactotron.createSagaMonitor();
    reactorEnhancer = Reactotron.createEnhancer();
    console.tron = Reactotron;
  } else {
    console.tron = {log: () => null, error: () => null};
  }
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const enhancers = compose(...compact([appliedMiddleware, reactorEnhancer]));
  const store = createStore(rootReducer, initialState, enhancers);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};
