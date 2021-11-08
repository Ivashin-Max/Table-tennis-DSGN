
import { getGoogleSrpeadsheet } from './google';


export async function getDivisionsSpreadsheetsIds(spreadsheetId) {


	const divisionsSpreadsheetsIds = {};
	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId);
	const firstSheet = spreadsheet.sheetsByIndex[0]
	await firstSheet.loadCells('A1:B10');
	const firstSheetCells = firstSheet;

	const arr = [];
	for (let i = 1; i < 7; i++) {
		arr.push(firstSheetCells.getCellByA1(`B${i}`).value);
	}

	divisionsSpreadsheetsIds.free = arr[0];
	divisionsSpreadsheetsIds.first = arr[1];
	divisionsSpreadsheetsIds.second = arr[2];
	divisionsSpreadsheetsIds.third = arr[3];
	divisionsSpreadsheetsIds.high = arr[4];
	divisionsSpreadsheetsIds.ttClub = arr[5];

	return divisionsSpreadsheetsIds;
}




