import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducerTable, reducerData, reducerDate, reducerDivisions, reducerRole } from './reducer.js';
import ReduxThunk from 'redux-thunk';

// export const store = createStore(reducerTable);

const middlewareConfig = () => [
  { condition: true, middleware: ReduxThunk },
];

export const getMiddleware = (config = middlewareConfig()) => (
  config.filter(el => el.condition).map(el => el.middleware)
);




export const rootReducer = combineReducers({ table: reducerTable, data: reducerData, date: reducerDate, divisions: reducerDivisions, role: reducerRole })

export const store = createStore(
  rootReducer,
  applyMiddleware(...getMiddleware()),
);