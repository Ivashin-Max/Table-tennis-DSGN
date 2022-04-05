//Ходим в таблицу,(id=id,title = name)
//по итогу кладём в стор всю нужную дату
//при обновлении стора у нас обновится компонент 

import { setData, setDateFlag } from '../store/reducer.js';
import { getGoogleSrpeadsheet } from './google';
import { checkDate } from './date';

export const fetchParticipants = (tournamentId) => async (dispatch, getState) => {
  console.log('tournamentId', tournamentId)


  // checkDate(settingsArr[1], settingsArr[2])
  // await dispatch(setDateFlag({
  //   isLate: checkDate(settingsArr[1], settingsArr[2])
  // }))
  // await dispatch(setData({
  //   tournamentPlace: settingsArr[3],
  //   tournamentTell: settingsArr[4],
  //   tournamentRate: settingsArr[5],
  //   tournamentPrice: settingsArr[8],
  //   tournamentOrgFio: settingsArr[7],
  //   tableDivisionName: settingsArr[0],
  //   tableDate: settingsArr[1],
  //   tableTime: settingsArr[2],
  //   tableTotal: settingsArr[6],
  //   tableFio: fioArr,
  //   tableZapas: zapasArr
  // }))
  // return fioArr
}

export const getTournamentInfoFromStore = (param) => (dispatch, getState) => {
  const store = getState();
  // const neededTournament
  console.log('store', store.divisions.divisions)
  return
}
