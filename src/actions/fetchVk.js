import { setVk } from '../store/reducer';


export const fetchVk = () => async (dispatch, getState) => {

	// eslint-disable-next-line no-undef
	await VK.Auth.login(async (r) => {
		let vkInfo = r.session.user
		console.log(vkInfo);

	})

}




