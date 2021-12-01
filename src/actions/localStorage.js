import { reactLocalStorage } from 'reactjs-localstorage';


export const setId = (vkId) => reactLocalStorage.set('vkId', vkId)

export const clearStorage = (e) => {
	e.preventDefault();
	reactLocalStorage.clear();
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

export const getPromptFio = () => {

	if (!reactLocalStorage.get('fio')) return []
	else { return reactLocalStorage.get('fio').split(',') }
}