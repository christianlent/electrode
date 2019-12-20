import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

export default (reducers) => {
  const rootReducer = typeof reducers === 'object'
    ? combineReducers(reducers)
    : reducers
  ;
  return () => createStore(rootReducer, applyMiddleware(thunk));
};