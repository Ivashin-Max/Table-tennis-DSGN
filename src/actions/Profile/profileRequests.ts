import axios from "axios";
import url from '../../static/url.json'
import { IAuthProfile, INewProfile } from "../../types/profile";

export const newProfile = async (newProfile: INewProfile): Promise<any> => {
  const apiUrl = url.back + url.endpoints.addProfile;
  let response = null;
  await axios.post(apiUrl, newProfile)
    .then(data => response = { success: true, data: data })
    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}


export const authProfile = async (profile: IAuthProfile): Promise<any> => {
  const apiUrl = url.back + url.endpoints.authProfile;
  let response = null;
  await axios.post(apiUrl, profile)
    .then(data => response = { success: true, data: data })
    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}