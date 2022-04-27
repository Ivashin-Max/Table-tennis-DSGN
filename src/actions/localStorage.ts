import { reactLocalStorage } from 'reactjs-localstorage';
import { localStorageUser } from '../types/localStorage';



export const setUser = (user: localStorageUser) => {
  console.log(`Получил юзера, кладу в ЛокалСторадж`, user);
  return reactLocalStorage.setObject('user', user)
}

export const getUser = () => {
  return reactLocalStorage.getObject('user');
}


export const clearStorage = () => {
  reactLocalStorage.clear();
}

export const removeStorageItem = (itemKey: string) => {
  reactLocalStorage.remove(itemKey)
}



export const addFioToStorage = (fio: string) => {
  const isFio = reactLocalStorage.get('fio')
  if (!isFio) {
    reactLocalStorage.set('fio', fio)
  }
  else {
    if (isFio.split(',').includes(fio)) console.log('takoy yzhe est"')
    else reactLocalStorage.set('fio', `${isFio},${fio}`)
  }
}

export const addTellToStorage = (tell: string) => {
  const isTell = reactLocalStorage.get('tell')
  if (!isTell) {
    reactLocalStorage.set('tell', tell)
  }
  else {
    if (isTell.split(',').includes(tell)) console.log('takoy yzhe est"')
    else reactLocalStorage.set('tell', `${isTell},${tell}`)
  }
}

export const getPromptFio = () => {

  if (!reactLocalStorage.get('fio')) return []
  else { return reactLocalStorage.get('fio').split(',') }
}

export const getPromptTell = () => {

  if (!reactLocalStorage.get('tell')) return []
  else { return reactLocalStorage.get('tell').split(',') }
}