//Стор для хранения АДРЕСА текущей выведенной таблицы
const neededTable = {
	neededDivisionId: '',
	neededTournamentName: '',
}

const SET_TABLE = 'SET_TABLE';

export const setTable = (payload) => {
	return {
		type: SET_TABLE,
		payload
	}
}

export function reducerTable(state = neededTable, action) {
	switch (action.type) {
		case 'SET_TABLE':
			return { ...state, neededDivisionId: action.payload.neededDivisionId, neededTournamentName: action.payload.neededTournamentName }
		default:
			return state;
	}
}

//Стор для хранения ссылок на таблицы (получаем из настроечной при ините апа и больше не трогаем)
const spreadsheetsIds = {
	free: '',
	first: '',
	second: '',
	third: '',
	high: '',
	ttClub: ''
}

const SET_Ids = 'SET_Ids';

export const setIds = (payload) => {
	return {
		type: SET_Ids,
		payload
	}
}

export function reducerSpreadsheetsIds(state = spreadsheetsIds, action) {
	switch (action.type) {
		case 'SET_Ids':
			return {
				...state,
				free: action.payload.free,
				first: action.payload.first,
				second: action.payload.second,
				third: action.payload.third,
				high: action.payload.high,
				ttClub: action.payload.ttClub,
			}
		default:
			return state;
	}
}

//Стор для хранения данных по турнирам (получаем из настроечной при ините апа и больше не трогаем)
const spreadsheets = {
	free: {
    url:'',
    tournaments: []
  },
	first: {
    url:'',
    tournaments: []
  },
	second: {
    url:'',
    tournaments: []
  },
	third: {
    url:'',
    tournaments: []
  },
	high: {
    url:'',
    tournaments: []
  },
	ttClub: {
    url:'',
    tournaments: []
  }
}

const SET_spreadsheets = 'SET_spreadsheets';

export const setSpreadsheets = (payload) => {
	return {
		type: SET_spreadsheets,
		payload
	}
}

export function reducerSpreadsheets(state = spreadsheets, action) {
	switch (action.type) {
		case SET_spreadsheets:
			return {
				...state,
				free: {url: action.payload.free.url, tournaments: action.payload.free.tournaments},
				first: {url: action.payload.first.url, tournaments: action.payload.first.tournaments},
				second: {url: action.payload.second.url, tournaments: action.payload.second.tournaments},
				third: {url: action.payload.third.url, tournaments: action.payload.third.tournaments},
				high: {url: action.payload.high.url, tournaments: action.payload.high.tournaments},
				ttClub: {url: action.payload.ttClub.url, tournaments: action.payload.ttClub.tournaments},
			}
		default:
			return state;
	}
}

//Стор для хранения ДАННЫХ текущей выведенной таблицы
const fetchedData = {
	tournamentPlace: '',
	tournamentTell: '',
  tournamentOrgFio: '',
	tournamentRate: '',
  tournamentPrice: '',
	tableDivisionName: '',
	tableDate: '',
	tableTime: '',
	tableTotal: '',
	tableFio: [],
	tableZapas: []
}

const SET_DATA = 'SET_DATA';

export const setData = (payload) => {
	return {
		type: SET_DATA,
		payload
	}
}

export function reducerData(state = fetchedData, action) {
	switch (action.type) {
		case 'SET_DATA':
			return {
				...state,
				tournamentPlace: action.payload.tournamentPlace,
				tournamentTell: action.payload.tournamentTell,
        tournamentOrgFio: action.payload.tournamentOrgFio,
				tournamentRate: action.payload.tournamentRate,
        tournamentPrice: action.payload.tournamentPrice,
				tableDivisionName: action.payload.tableDivisionName,
				tableDate: action.payload.tableDate,
				tableTime: action.payload.tableTime,
				tableTotal: action.payload.tableTotal,
				tableFio: action.payload.tableFio,
				tableZapas: action.payload.tableZapas,
			}
		default:
			return state;
	}
}

//Стор для чека даты
const date = {
  isLate: false
}

const SET_DATE = 'SET_DATE';


export const setDateFlag = (payload) => {
	return {
		type: SET_DATE,
		payload
	}
}

export function reducerDate(state = date, action) {
	switch (action.type) {
		case SET_DATE:
			return {
				...state,
				isLate: action.payload.isLate,
			}

		default:
			return state;
	}
}