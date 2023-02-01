import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reducerTable, reducerData, reducerDate, reducerDivisions, reducerRole, reducerModal, reducerAuth, reducerLoading, reducerCalendarMode, reducerCity } from './reducer.js';
import ReduxThunk from 'redux-thunk';
import thunk from 'redux-thunk';

const middlewareConfig = () => [
  { condition: true, middleware: ReduxThunk },
];

export const getMiddleware = (config = middlewareConfig()) => (
  config.filter(el => el.condition).map(el => el.middleware)
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const rootReducer = combineReducers({ table: reducerTable, data: reducerData, date: reducerDate, divisions: reducerDivisions, role: reducerRole, modal: reducerModal, auth: reducerAuth, loading: reducerLoading, calendarMode: reducerCalendarMode, city:reducerCity })

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);