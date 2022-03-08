import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import piesReducer from './allPies';
import singlePieReducer from './singlePie';
import usersReducer from './allUsers';
import singleUserReducer from './singleUser';

const reducer = combineReducers({ 
  auth, 
  pies: piesReducer, 
  pie: singlePieReducer,
  users: usersReducer,
  user: singleUserReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
