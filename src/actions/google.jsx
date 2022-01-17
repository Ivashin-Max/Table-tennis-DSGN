import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds0 from '../durable-gift/durable-gift-325518-39e7c9c58c08.json';
import creds1 from '../durable-gift/durable-gift-325518-4ab30bde13ad.json';
import creds2 from '../durable-gift/durable-gift-325518-58e461d27598.json';
import creds3 from '../durable-gift/durable-gift-325518-5ecff2cf61b7.json';
import creds4 from '../durable-gift/durable-gift-325518-9afd12d73f3e.json';

export async function getGoogleSrpeadsheet(spreadsheetId) {
	//Прокидываем запрос к "настроечной таблице"
	const srpeadsheet = new GoogleSpreadsheet(spreadsheetId);
	//!ОБЯЗАТЕЛЬНАЯ аутентификация
  const randomCreds = Math.floor(Math.random()*10/2)
  switch (randomCreds) {
    case 0: await srpeadsheet.useServiceAccountAuth(creds0);
        // console.log(`creds0`, creds0);
      break;

      case 1: await srpeadsheet.useServiceAccountAuth(creds1);
      // console.log(`creds1`, creds1);
      break;

      case 2: await srpeadsheet.useServiceAccountAuth(creds2);
      // console.log(`creds2`, creds2);
      break;

      case 3: await srpeadsheet.useServiceAccountAuth(creds3);
      // console.log(`creds3`, creds3);
      break;

      case 4: await srpeadsheet.useServiceAccountAuth(creds4);
      // console.log(`creds4`, creds4);
      break;
  
    default:
      break;
  }
	// await srpeadsheet.useServiceAccountAuth(creds0);

	//Загрузка, обязательна
	await srpeadsheet.loadInfo()
  .then(
    () => console.log( `Использую сервис аккаунт №${randomCreds}, then res`, srpeadsheet))


	//получаем результат 
	const result = srpeadsheet;

	return result
}


export async function getSheetsNames(spreadsheetId) {
	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId);
	const sheetsCount = spreadsheet.sheetCount
	// console.groupCollapsed(`В таблице '${spreadsheet.title} дивизион' ${sheetsCount} листa(ов)`);

	const tornamentNames = [];
	for (let i = 0; i < sheetsCount; i++) {
		tornamentNames.push(spreadsheet.sheetsByIndex[i].title)
	}

	// console.table(tornamentNames);
	// console.groupEnd();
	return tornamentNames
}

export async function getSheet(spreadsheetId, sheetTitle, range) {
	const spreadsheet = await getGoogleSrpeadsheet(spreadsheetId);
	const neededTournament = spreadsheet.sheetsByTitle[sheetTitle];
	await neededTournament.loadCells(range);
	return neededTournament
}




