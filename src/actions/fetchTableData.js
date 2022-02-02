//Ходим в таблицу,(id=id,title = name)
//по итогу кладём в стор всю нужную дату
//при обновлении стора у нас обновится компонент 

import { setData, setDateFlag } from '../store/reducer';
import { getGoogleSrpeadsheet } from './google';
import { checkDate } from './date';

export const fetchTableData = (param) => async (dispatch, getState) => {
  // console.log('par',param);
  const DATA_STARTS_FROM_CELL = 2;
  //получаем со стора айди и тайтл нужной таблицы
  const store = getState();
  console.groupCollapsed('Хотим сходить в таблицу со следующими данными');
  console.table(store.table);
  console.groupEnd();
  //идём в эту таблицу
  let spreadsheet = param;
  let neededTournament;
  if (!param) {
    spreadsheet = await getGoogleSrpeadsheet(store.table.neededDivisionId);
    neededTournament = spreadsheet.sheetsByTitle[store.table.neededTournamentName];

  } else {
    neededTournament = spreadsheet._spreadsheet.sheetsByTitle[store.table.neededTournamentName];
  }

  await neededTournament.loadCells('A1:J70');
  const settings = neededTournament;
  console.log('Получили дату,сходив в таблицу', settings);
  const settingsArr = [];
  for (let i = 1; i < 11; i++) {
    settingsArr.push(settings.getCellByA1(`H${i}`).value);
  }
  console.log('Массив настроек', settingsArr);
  const zapasStartsFromCell = settingsArr[6] + 2;
  const fio = neededTournament;
  const fioArr = [];
  const zapasArr = [];

  for (let i = DATA_STARTS_FROM_CELL; i < zapasStartsFromCell; i++) {
    const fio1 = fio.getCellByA1(`B${i}`).value;
    if (fio1 !== null) {
      fioArr.push({
        fio1: fio1,
        fio2: fio.getCellByA1(`D${i}`).value,
        rttf1: fio.getCellByA1(`E${i}`).value,
        rttf2: fio.getCellByA1(`F${i}`).value,
      })
    }
  }

  for (let i = zapasStartsFromCell; i < zapasStartsFromCell + 15; i++) {
    const fio1 = fio.getCellByA1(`B${i}`).value;
    if (fio1 !== null) {
      zapasArr.push({
        fio1: fio1,
        fio2: fio.getCellByA1(`D${i}`).value,
        rttf1: fio.getCellByA1(`E${i}`).value,
        rttf2: fio.getCellByA1(`F${i}`).value,
      })
    }
  }
  const doubleTournamentFlag = settingsArr[9] === 'да' ? true : false

  await dispatch(setDateFlag({
    isLate: checkDate(settingsArr[1], settingsArr[2])
  }))
  await dispatch(setData({
    tournamentPlace: settingsArr[3],
    tournamentTell: settingsArr[4],
    tournamentRate: settingsArr[5],
    tournamentPrice: settingsArr[8],
    tournamentOrgFio: settingsArr[7],
    tableDivisionName: settingsArr[0],
    tableDate: settingsArr[1],
    tableTime: settingsArr[2],
    tableTotal: settingsArr[6],
    tableFio: fioArr,
    tableZapas: zapasArr,
    doubleTournamentFlag: doubleTournamentFlag
  }))
  return fioArr
}
