import { setSpreadsheets } from '../store/reducer';
import { vkSubscribe } from './vk';
import { getDivisionsSpreadsheets } from './renderNav';
import url from '../static/url.json';
import axios from 'axios';

export const initApp = () => async (dispatch, getState) => {
  //Получаем ссылки из настроечной таблицы
  const test = await getDivisionsSpreadsheets(url.settingsURL)
    .catch((e) => {
      console.log('Ошибка доступа к таблице', e);
      alert(`Ошибка доступа к таблице \n ${e}`)
    });
  // axios.get(url.back + url.endpoints.divisions)
  //   .then(res => console.log('Axios', res))
  //Кладём их в стор
  dispatch(setSpreadsheets({
    free: { url: test.free.url, tournaments: test.free.tournaments },
    first: { url: test.first.url, tournaments: test.first.tournaments },
    second: { url: test.second.url, tournaments: test.second.tournaments },
    third: { url: test.third.url, tournaments: test.third.tournaments },
    high: { url: test.high.url, tournaments: test.high.tournaments },
    ttClub: { url: test.ttClub.url, tournaments: test.ttClub.tournaments },
    links: test.links
  }))

  const table = getState();
  console.groupCollapsed('Сходили в настроечную таблицу, теперь в сторе хранятся следующие данные по турнирам');
  console.log(table.test);
  console.groupEnd();
  vkSubscribe();
}

