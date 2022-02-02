import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducerTable,  reducerData,  reducerSpreadsheets, reducerDate } from './reducer';
import ReduxThunk from 'redux-thunk';

// export const store = createStore(reducerTable);

const middlewareConfig = () => [
	{ condition: true, middleware: ReduxThunk },
];

export const getMiddleware = (config = middlewareConfig()) => (
	config.filter(el => el.condition).map(el => el.middleware)
);



const rootReducer = combineReducers({ table: reducerTable, data: reducerData, date:reducerDate, test: reducerSpreadsheets })

export const store = createStore(
	rootReducer,
	applyMiddleware(...getMiddleware()),
);