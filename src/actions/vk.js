import { setId } from "./localStorage";


const fetchVk = () => {

	// eslint-disable-next-line no-undef
	VK.Auth.login((r) => {
		let vkId = r.session.user.id
		console.log(`Сходили в вк, достали Id:${vkId}, положили в локалСторадж`);
		setId(vkId)
	})
}


export const vkAuth = (e) => {
	e.preventDefault();
	fetchVk();
}




