
import { getGoogleSrpeadsheet } from './google';


export async function getDivisionsSpreadsheets(spreadsheetId) {

	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId) //.then((r)=>console.log('r',r));
	const firstSheet = spreadsheet.sheetsByIndex[0]
	await firstSheet.loadCells('A1:S14');
	const firstSheetCells = firstSheet;

  const SHEET_NAME_LETTER = "A"
  const FREE_CELL_LETTERS = "B|C|D"
  const FIRST_CELL_LETTERS = "E|F|G"
  const SECOND_CELL_LETTERS = "H|I|J"
  const THIRD_CELL_LETTERS = "K|L|M"
  const HIGH_CELL_LETTERS = "N|O|P"
  const TT_CELL_LETTERS = "Q|R|S"
  const nameCellSplit = 0;
  const totalCellSplit = 1;
  const urlCellSplit = 1;
  const dayCellSplit = 2;
  const URL_CELL_NUM = "2"

  const testdiv = {
    free: {},
    first: {},
    second: {},
    third: {},
    high: {},
    ttClub: {}
  };

testdiv.free = {
  url: firstSheetCells.getCellByA1(FREE_CELL_LETTERS.split("|")[urlCellSplit] + URL_CELL_NUM).value,
  tournaments: []
}
for (let i = 5; i < 14; i++) {
  const tournament = firstSheetCells.getCellByA1(FREE_CELL_LETTERS.split("|")[nameCellSplit] + i).value;
  if (tournament) {
    testdiv.free.tournaments.push({
      pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
      tournamentName: tournament,
      total: firstSheetCells.getCellByA1(FREE_CELL_LETTERS.split("|")[totalCellSplit] + i).value,
      day: firstSheetCells.getCellByA1(FREE_CELL_LETTERS.split("|")[dayCellSplit] + i).value
    })
  }
}

testdiv.first = {
  url: firstSheetCells.getCellByA1(FIRST_CELL_LETTERS.split("|")[urlCellSplit] + URL_CELL_NUM).value,
  tournaments: []
}
for (let i = 5; i < 14; i++) {
  const tournament = firstSheetCells.getCellByA1(FIRST_CELL_LETTERS.split("|")[nameCellSplit] + i).value;
  if (tournament) {
    testdiv.first.tournaments.push({
      pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
      tournamentName: tournament,
      total: firstSheetCells.getCellByA1(FIRST_CELL_LETTERS.split("|")[totalCellSplit] + i).value,
      day: firstSheetCells.getCellByA1(FIRST_CELL_LETTERS.split("|")[dayCellSplit] + i).value
    })
  }
}

testdiv.second = {
  url: firstSheetCells.getCellByA1(SECOND_CELL_LETTERS.split("|")[urlCellSplit] + URL_CELL_NUM).value,
  tournaments: []
}
for (let i = 5; i < 14; i++) {
  const tournament = firstSheetCells.getCellByA1(SECOND_CELL_LETTERS.split("|")[nameCellSplit] + i).value;
  if (tournament) {
    testdiv.second.tournaments.push({
      pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
      tournamentName: tournament,
      total: firstSheetCells.getCellByA1(SECOND_CELL_LETTERS.split("|")[totalCellSplit] + i).value,
      day: firstSheetCells.getCellByA1(SECOND_CELL_LETTERS.split("|")[dayCellSplit] + i).value
    })
  }
}

testdiv.third = {
  url: firstSheetCells.getCellByA1(THIRD_CELL_LETTERS.split("|")[urlCellSplit] + URL_CELL_NUM).value,
  tournaments: []
}
for (let i = 5; i < 14; i++) {
  const tournament = firstSheetCells.getCellByA1(THIRD_CELL_LETTERS.split("|")[nameCellSplit] + i).value;
  if (tournament) {
    testdiv.third.tournaments.push({
      pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
      tournamentName: tournament,
      total: firstSheetCells.getCellByA1(THIRD_CELL_LETTERS.split("|")[totalCellSplit] + i).value,
      day: firstSheetCells.getCellByA1(THIRD_CELL_LETTERS.split("|")[dayCellSplit] + i).value
    })
  }
}

testdiv.high = {
  url: firstSheetCells.getCellByA1(HIGH_CELL_LETTERS.split("|")[urlCellSplit] + URL_CELL_NUM).value,
  tournaments: []
}
for (let i = 5; i < 14; i++) {
  const tournament = firstSheetCells.getCellByA1(HIGH_CELL_LETTERS.split("|")[nameCellSplit] + i).value;
  if (tournament) {
    testdiv.high.tournaments.push({
      pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
      tournamentName: tournament,
      total: firstSheetCells.getCellByA1(HIGH_CELL_LETTERS.split("|")[totalCellSplit] + i).value,
      day: firstSheetCells.getCellByA1(HIGH_CELL_LETTERS.split("|")[dayCellSplit] + i).value
    })
  }
}

testdiv.ttClub = {
  url: firstSheetCells.getCellByA1(TT_CELL_LETTERS.split("|")[urlCellSplit] + URL_CELL_NUM).value,
  tournaments: []
}
for (let i = 5; i < 14; i++) {
  const tournament = firstSheetCells.getCellByA1(TT_CELL_LETTERS.split("|")[nameCellSplit] + i).value;
  if (tournament) {
    testdiv.ttClub.tournaments.push({
      pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
      tournamentName: tournament,
      total: firstSheetCells.getCellByA1(TT_CELL_LETTERS.split("|")[totalCellSplit] + i).value,
      day: firstSheetCells.getCellByA1(TT_CELL_LETTERS.split("|")[dayCellSplit] + i).value
    })
  }
}


	return testdiv;
}




