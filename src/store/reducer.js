//Стор для хранения ID текущей выведенной таблицы
const neededTable = {
  neededDivisionId: null,
  neededTournamentId: null,
}

const SET_TABLE = 'SET_TABLE';

export const setTable = (payload: any) => {
  return {
    type: SET_TABLE,
    payload
  }
}

export function reducerTable(state = neededTable, action: any) {
  switch (action.type) {
    case 'SET_TABLE':
      return { ...state, neededDivisionId: action.payload.neededDivisionId, neededTournamentId: action.payload.neededTournamentId }
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
  tableZapas: [],
  team: null
}

const SET_DATA = 'SET_DATA';

export const setData = (payload: any) => {
  return {
    type: SET_DATA,
    payload
  }
}

export function reducerData(state = fetchedData, action: any) {
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
        team: action.payload.team,
      }
    default:
      return state;
  }
}

//Стор для чека даты
const date = {
  isLate: false
}

export const setDateFlag = (payload: any) => {
  return {
    type: 'SET_DATE',
    payload
  }
}

export function reducerDate(state = date, action: any) {
  switch (action.type) {
    case 'SET_DATE':
      return {
        ...state,
        isLate: action.payload.isLate,
      }

    default:
      return state;
  }
}


//-------------------------
//Стор для хранения данных по турнирам (получаем при ините апа и больше не трогаем)
const divisons: any[] = [];

const SET_DIVISIONS = 'SET_DIVISIONS';

export const setDivisions = (payload: any) => {
  return {
    type: SET_DIVISIONS,
    payload
  }
}

export function reducerDivisions(state = divisons, action: any) {
  switch (action.type) {
    case SET_DIVISIONS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

//Стор для хранения роли пользователя
const role = {
  isAdmin: false
}

export const setRole = (payload: any) => {
  return {
    type: 'SET_ROLE',
    payload
  }
}

export function reducerRole(state = role, action: any) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, isAdmin: action.payload.isAdmin }
    default:
      return state;
  }
}