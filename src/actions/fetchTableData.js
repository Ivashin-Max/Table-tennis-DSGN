//Ходим в таблицу,(id=id,title = name)
//по итогу кладём в стор всю нужную дату
//при обновлении стора у нас обновится компонент 

import { setData } from '../store/reducer';
import { getGoogleSrpeadsheet } from './google';


export const fetchTableData = () => async (dispatch, getState) => {
	const DATA_STARTS_FROM_CELL = 2;
	//получаем со стора айди и тайтл нужной таблицы
	const store = getState();
	console.groupCollapsed('Хотим сходить в таблицу со следующими данными');
	console.table(store.table);
	console.groupEnd();
	//идём в эту таблицу
	const spreadsheet = await getGoogleSrpeadsheet(store.table.neededDivisionId);
	const neededTournament = spreadsheet.sheetsByTitle[store.table.neededTournamentName];
	await neededTournament.loadCells('A1:E70');

	const settings = neededTournament;
	console.log('Получили дату,сходив в таблицу', settings);
	const settingsArr = [];
	for (let i = 1; i < 8; i++) {
		settingsArr.push(settings.getCellByA1(`E${i}`).value);
	}
	console.log('Массив настроек', settingsArr);
	const zapasStartsFromCell = settingsArr[6] + 2;
	const fio = neededTournament;
	const fioArr = [];
	const zapasArr = [];
	for (let i = DATA_STARTS_FROM_CELL; i < zapasStartsFromCell; i++) {
		const element = fio.getCellByA1(`B${i}`).value;
		if (element !== null) {
			fioArr.push(element)
		}
	}
	for (let i = zapasStartsFromCell; i < zapasStartsFromCell + 15; i++) {

		const element = fio.getCellByA1(`B${i}`).value;
		if (element !== null) {
			zapasArr.push(element)
		}
	}

	dispatch(setData({
		tournamentPlace: settingsArr[3],
		tournamentTell: settingsArr[4],
		tournamentRate: settingsArr[5],
		tableDivisionName: settingsArr[0],
		tableDate: settingsArr[1],
		tableTime: settingsArr[2],
		tableTotal: settingsArr[6],
		tableFio: fioArr,
		tableZapas: zapasArr
	}))

}
