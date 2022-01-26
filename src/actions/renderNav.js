
import { getGoogleSrpeadsheet } from './google';


export async function getDivisionsSpreadsheets(spreadsheetId) {

	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId) //.then((r)=>console.log('r',r));
	const firstSheet = spreadsheet.sheetsByIndex[0]
	await firstSheet.loadCells('A1:S40');
	const firstSheetCells = firstSheet;


  const FREE_CELL_LETTERS = "B|C|D"
  const FIRST_CELL_LETTERS = "E|F|G"
  const SECOND_CELL_LETTERS = "H|I|J"
  const THIRD_CELL_LETTERS = "K|L|M"
  const HIGH_CELL_LETTERS = "N|O|P"
  const TT_CELL_LETTERS = "Q|R|S"




  const testdiv = {};
  
  const parseTournamentsData = (divisionCellLetters) => {
    const tournaments = {
      url: "",
      tournaments: []
    }

    const SHEET_NAME_LETTER = "A"
    const nameCellSplit = 0;
    const totalCellSplit = 1;
    const urlCellSplit = 1;
    const dayCellSplit = 2;
    const URL_CELL_NUM = "2";


    tournaments.url = firstSheetCells.getCellByA1(divisionCellLetters.split("|")[urlCellSplit] + URL_CELL_NUM).value;
    for (let i = 5; i < 14; i++) {
      const tournament = firstSheetCells.getCellByA1(divisionCellLetters.split("|")[nameCellSplit] + i).value;
      if (tournament) {
        tournaments.tournaments.push({
          pageName: firstSheetCells.getCellByA1(SHEET_NAME_LETTER + i).value,
          tournamentName: tournament,
          total: firstSheetCells.getCellByA1(divisionCellLetters.split("|")[totalCellSplit] + i).value,
          day: firstSheetCells.getCellByA1(divisionCellLetters.split("|")[dayCellSplit] + i).value
        })
      }
    }
  return tournaments
  }
  const parseLinks = () =>{
    const links = [];
    for (let i = 21; i < 40; i++) {
      const linkName =  firstSheetCells.getCellByA1(`A${i}`).value
      if (linkName) {
        const linkHttp = firstSheetCells.getCellByA1(`B${i}`).value;
        const linkMap = {}
        linkMap[linkName] = linkHttp
        links.push(linkMap)
      }
    }
    links.sort((a, b) => {
      const objA = Object.keys(a)[0];
      const objB = Object.keys(b)[0];
      return objA.length - objB.length});
    return links
  }


testdiv.free= parseTournamentsData(FREE_CELL_LETTERS);
testdiv.first= parseTournamentsData(FIRST_CELL_LETTERS);
testdiv.second= parseTournamentsData(SECOND_CELL_LETTERS);
testdiv.third= parseTournamentsData(THIRD_CELL_LETTERS);
testdiv.high= parseTournamentsData(HIGH_CELL_LETTERS);
testdiv.ttClub = parseTournamentsData(TT_CELL_LETTERS);
testdiv.links = parseLinks()

	return testdiv;
}




