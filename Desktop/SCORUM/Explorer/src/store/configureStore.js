import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics/root';
import rootReducer from '../reducers/index';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(initialState) {
  const middlewares = [
    epicMiddleware,
  ];
  if (process.env.PROJECT_ENV !== 'production') {
    // eslint-disable-next-line
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middlewares));

  return createStore(rootReducer, initialState, enhancer);
}
