import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { apiReducer } from './modules/api/reducer';
import { root } from './sagas';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // @ts-ignore
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  api: apiReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(root);

export type AppState = ReturnType<typeof rootReducer>;
export { store };

