import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../durable-gift-325518-58e461d27598.json';

export async function getGoogleSrpeadsheet(spreadsheetId) {
	//Прокидываем запрос к "настроечной таблице"
	const srpeadsheet = new GoogleSpreadsheet(spreadsheetId);
	//!ОБЯЗАТЕЛЬНАЯ аутентификация
	await srpeadsheet.useServiceAccountAuth(creds);
	//Загрузка, обязательна
	await srpeadsheet.loadInfo()
// .then(
//     result => console.log("then res", result),
//     error => console.log("error res", error)
//     )


	//получаем результат 
	const result = srpeadsheet;

	return result
}


export async function getSheetsNames(spreadsheetId) {
	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId);
	const sheetsCount = spreadsheet.sheetCount
	console.groupCollapsed(`В таблице '${spreadsheet.title} дивизион' ${sheetsCount} листa(ов)`);

	const tornamentNames = [];
	for (let i = 0; i < sheetsCount; i++) {
		tornamentNames.push(spreadsheet.sheetsByIndex[i].title)
	}

	console.table(tornamentNames);
	console.groupEnd();
	return tornamentNames
}

export async function getSheet(spreadsheetId, sheetTitle, range) {
	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId);
	const neededTournament = spreadsheet.sheetsByTitle[sheetTitle];
	await neededTournament.loadCells(range);
	return neededTournament
}




