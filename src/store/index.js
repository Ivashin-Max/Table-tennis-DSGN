import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducerTable, reducerData, reducerDate, reducerDivisions, reducerRole, reducerModal, reducerAuth, reducerLoading, reducerCalendarMode } from './reducer.js';
import ReduxThunk from 'redux-thunk';
import thunk from 'redux-thunk';
// export const store = createStore(reducerTable);

const middlewareConfig = () => [
  { condition: true, middleware: ReduxThunk },
];

export const getMiddleware = (config = middlewareConfig()) => (
  config.filter(el => el.condition).map(el => el.middleware)
);




export const rootReducer = combineReducers({ table: reducerTable, data: reducerData, date: reducerDate, divisions: reducerDivisions, role: reducerRole, modal: reducerModal, auth: reducerAuth, loading: reducerLoading, calendarMode: reducerCalendarMode })

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);