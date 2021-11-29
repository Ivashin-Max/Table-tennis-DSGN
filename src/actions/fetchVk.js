import { setVk } from '../store/reducer';


export const fetchVk = () => async (dispatch, getState) => {

	// eslint-disable-next-line no-undef
	await VK.Auth.login(async (r) => {
		let vkInfo = r.session.user
		console.log(vkInfo);
		await dispatch(setVk({
			name: vkInfo.first_name,
			lastName: vkInfo.last_name,
			id: vkInfo.id,
			fullfield: true
		}))
		const store = getState()
		console.log(`Сходили в ВК, положили в стор следующие данные:`, store.vk);
	})

}




