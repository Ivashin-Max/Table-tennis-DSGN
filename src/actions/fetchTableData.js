//Ходим в таблицу,(id=id,title = name)
//по итогу кладём в стор всю нужную дату
//при обновлении стора у нас обновится компонент 

import { setData } from '../store/reducer';
import { getGoogleSrpeadsheet } from './google';


export const fetchTableData = () => async (dispatch, getState) => {
	//получаем со стора айди и тайтл нужной таблицы
	const store = getState();
	console.groupCollapsed('Хотим сходить в таблицу со следующими данными');
	console.table(store.table);
	console.groupEnd();
	//идём в эту таблицу
	const spreadsheet = await getGoogleSrpeadsheet(store.table.neededDivisionId);
	const neededTournament = spreadsheet.sheetsByTitle[store.table.neededTournamentName];
	await neededTournament.loadCells('A1:E50');

	const settings = neededTournament;
	// console.log('Получили дату,сходив в таблицу', settings);
	const settingsArr = [];
	for (let i = 1; i < 8; i++) {
		settingsArr.push(settings.getCellByA1(`E${i}`).value);
	}
	// console.log('Массив настроек', settingsArr);
	const fio = neededTournament;
	const fioArr = [];
	const zapasArr = [];
	for (let i = 2; i < settingsArr[5] + 2; i++) {
		const element = fio.getCellByA1(`B${i}`).value;
		if (element !== null) {
			fioArr.push(element)
		}
	}
	for (let i = settingsArr[5] + 2; i < 30; i++) {

		const element = fio.getCellByA1(`B${i}`).value;
		if (element !== null) {
			zapasArr.push(element)
		}
	}

	dispatch(setData({
		tournamentPlace: settingsArr[2],
		tournamentTell: settingsArr[3],
		tournamentRate: settingsArr[4],
		tableDivisionName: settingsArr[0],
		tableDate: settingsArr[1],
		tableTime: settingsArr[1],
		tableTotal: settingsArr[5],
		tableFio: fioArr,
		tableZapas: zapasArr
	}))
	console.log(store.data);


}
