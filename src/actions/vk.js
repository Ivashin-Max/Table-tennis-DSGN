// import { setId } from "./localStorage";


// export const fetchVk =  () => {
// // eslint-disable-next-line no-undef
// 	VK.Auth.login((r) => setId(r.session.mid))
// }


  // eslint-disable-next-line no-undef
export const vkSubscribe = () => { VK.Observer.subscribe('auth.login', function(response){
  console.log("subscribe", response);
  // setId(response.session.mid)
})}




