import { reactLocalStorage } from 'reactjs-localstorage';


export const setId = (vkId) => {
  console.log(`Получил ID: ${vkId}, кладу в ЛокалСторадж`);
  return reactLocalStorage.set('vkId', vkId)}

export const clearStorage = () => {
	reactLocalStorage.clear();
}

export const removeStorageItem = (itemKey) => {
	reactLocalStorage.remove(itemKey)
}

export const checkStoragedId = () => reactLocalStorage.get('vkId')

export const addFioToStorage = (fio) => {
	const isFio = reactLocalStorage.get('fio')
	if (!isFio) {
		reactLocalStorage.set('fio', fio)
	}
	else {
		if (isFio.split(',').includes(fio)) console.log('takoy yzhe est"')
		else reactLocalStorage.set('fio', `${isFio},${fio}`)
	}
}

export const addTellToStorage = (tell) => {
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