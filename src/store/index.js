import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducerTable,  reducerData,  reducerSpreadsheets, reducerDate } from './reducer';
import ReduxThunk from 'redux-thunk';



const middlewareConfig = () => [
	{ condition: true, middleware: ReduxThunk },
];

export const getMiddleware = (config = middlewareConfig()) => (
	config.filter(el => el.condition).map(el => el.middleware)
);



const rootReducer = combineReducers({ table: reducerTable, data: reducerData, dateFlag:reducerDate, settingsTable: reducerSpreadsheets })

export const store = createStore(
	rootReducer,
	applyMiddleware(...getMiddleware()),
);