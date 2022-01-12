import { getDivisionsSpreadsheetsIds } from './renderNavbar';
import { setIds } from '../store/reducer';
import { vkSubscribe } from './vk';


export const initApp = () => async (dispatch, getState) => {
	//Получаем ссылки из настроечной таблицы
	const divisionsSpreedsheetsLinks = await getDivisionsSpreadsheetsIds('1PKVkuDeCrDG4wLFiM6DhPVXrlvmFk8fcfROXi4WNcoE');

	//Кладём их в стор
	dispatch(setIds({
		free: divisionsSpreedsheetsLinks.free,
		first: divisionsSpreedsheetsLinks.first,
		second: divisionsSpreedsheetsLinks.second,
		third: divisionsSpreedsheetsLinks.third,
		high: divisionsSpreedsheetsLinks.high,
		ttClub: divisionsSpreedsheetsLinks.ttClub,
	}))

	const table = getState();
	console.groupCollapsed('Сходили в настроечную таблицу, теперь в сторе хранятся следующие ссылки на таблицы');
	console.table(table.spreadId);
	console.groupEnd();
  vkSubscribe();
}

