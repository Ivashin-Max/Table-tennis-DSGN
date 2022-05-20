import { reactLocalStorage } from 'reactjs-localstorage';
import { localStorageUser } from '../types/localStorage';

export const setUser = (user: localStorageUser) => {
  console.log(`Получил юзера, кладу в ЛокалСторадж`, user);
  return reactLocalStorage.setObject('user', user)
}

export const getUser = () => {
  return reactLocalStorage.getObject('user');
}

export const removeStorageItem = (itemKey: string) => {
  reactLocalStorage.remove(itemKey)
}

export const addLocalStorageItem = (key: string, newValue: string) => {
  const existingValues = reactLocalStorage.get(key)
  if (existingValues) {
    if (existingValues.split(',').includes(newValue)) console.log(`В локалсторадж уже хранится ${newValue} по ключу ${key}`)
    else reactLocalStorage.set(key, `${existingValues},${newValue}`)
  }
  else {
    reactLocalStorage.set(key, newValue)
  }
}

export const getPromptFromLocalStorage = (key: string): ([] | string[]) => {
  if (!reactLocalStorage.get(key)) return []
  else return reactLocalStorage.get(key).split(',')
}
