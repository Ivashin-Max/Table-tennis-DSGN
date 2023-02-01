//Стор для хранения ID текущей выведенной таблицы
const neededTable = {
  neededDivisionId: null,
  neededTournamentId: null,
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
      return { ...state, neededDivisionId: action.payload.neededDivisionId, neededTournamentId: action.payload.neededTournamentId }
    default:
      return state;
  }
}


//Стор для хранения ДАННЫХ текущей выведенной таблицы
const initialState = {
  tournamentPlace: '',
  tournamentTell: '',
  tournamentOrgFio: '',
  tournamentRate: '',
  tournamentPrice: '',
  tournamentPrizes: '{}',
  tableDivisionName: '',
  tableDate: '',
  tableTime: '',
  tableTotal: '',
  tableFio: [],
  tableZapas: [],
  team: null
}
const fetchedData = { ...initialState }


const SET_DATA = 'SET_DATA';
const SET_EMPTY_DATA = 'SET_EMPTY_DATA';

export const setData = (payload) => {
  return {
    type: SET_DATA,
    payload
  }
}

export const setEmptyData = () => {
  return {
    type: SET_EMPTY_DATA,
  }
}

export function reducerData(state = fetchedData, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        tournamentPlace: action.payload.tournamentPlace,
        tournamentTell: action.payload.tournamentTell,
        tournamentOrgFio: action.payload.tournamentOrgFio,
        tournamentRate: action.payload.tournamentRate,
        tournamentPrice: action.payload.tournamentPrice,
        tournamentPrizes: action.payload.tournamentPrizes,
        tableDivisionName: action.payload.tableDivisionName,
        tableDate: action.payload.tableDate,
        tableTime: action.payload.tableTime,
        tableTotal: action.payload.tableTotal,
        tableFio: action.payload.tableFio,
        tableZapas: action.payload.tableZapas,
        team: action.payload.team,
      }
    case SET_EMPTY_DATA:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}

//Стор для чека даты
const date = {
  isLate: false
}

export const setDateFlag = (payload) => {
  return {
    type: 'SET_DATE',
    payload
  }
}

export function reducerDate(state = date, action) {
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
const divisons = [];

const SET_DIVISIONS = 'SET_DIVISIONS';

export const setDivisions = (payload) => {
  return {
    type: SET_DIVISIONS,
    payload
  }
}

export function reducerDivisions(state = divisons, action) {
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


//-------------------------
//Стор для хранения текущего города 
const city = {};

const SET_CITY = 'SET_CITY';

export const setCity = (payload) => {
  return {
    type: SET_CITY,
    payload
  }
}

export function reducerCity(state = city, action) {
  switch (action.type) {
    case SET_CITY:
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
  isAdmin: false,
  isEditor: false
}

export const setAdminRole = (payload) => {
  return {
    type: 'SET_ADMIN',
    payload
  }
}

export const setEditorRole = (payload) => {
  return {
    type: 'SET_EDITOR',
    payload
  }
}

export function reducerRole(state = role, action) {
  switch (action.type) {
    case 'SET_ADMIN':
      return { ...state, isAdmin: true, isEditor: false }
    case 'SET_EDITOR':
      return { ...state, isEditor: true, isAdmin: false }
    default:
      return state;
  }
}

//Стор для модалки
const modal = {
  active: false,
  title: '',
  modalMsg: ''
}

export const openModal = (payload) => {
  return {
    type: 'OPEN_MODAL',
    payload
  }
}

export const closeModal = (payload) => {
  return {
    type: 'CLOSE_MODAL',
    payload
  }
}

export function reducerModal(state = modal, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        active: true,
        title: action.payload.title,
        modalMsg: action.payload.modalMsg
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        active: false,
        modalMsg: state.modalMsg
      }
    default:
      return state;
  }
}
//Стор для backdrop
const loading = {
  isLoading: false
}

export const setLoading = (payload) => {
  return {
    type: 'SET_LOADING',
    payload
  }
}

export function reducerLoading(state = loading, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    default:
      return state;
  }
}

//Стор для flipCalendar
const calendarMode = {
  calendarMode: true
}

export const setCalendarMode = (payload) => {
  return {
    type: 'SET_CALENDAR',
    payload
  }
}

export function reducerCalendarMode(state = calendarMode, action) {
  switch (action.type) {
    case 'SET_CALENDAR':
      return {
        ...state,
        calendarMode: action.payload.calendarMode
      }
    default:
      return state;
  }
}

//Стор для auth
const auth = {
  isAuthorized: false,
  fio: '',
  rate_value: 0,
  tournamentsId: [],
  userInfo: {}

}

export const setAuth = (payload) => {
  return {
    type: 'SET_AUTH',
    payload
  }
}

export function reducerAuth(state = auth, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthorized: action.payload.isAuthorized,
        fio: action.payload.fio,
        rate_value: action.payload.rate_value,
        tournamentsId: action.payload.tournamentsId,
        userInfo: action.payload.userInfo,
      }
    default:
      return state;
  }
}
