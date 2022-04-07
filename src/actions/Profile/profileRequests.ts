import axios from "axios";
import url from '../../static/url.json'
import { IAuthProfileRequest, IAuthProfileResponse, INewProfile } from "../../types/profile";
import { getUser } from "../localStorage";

export const newProfile = async (newProfile: INewProfile): Promise<any> => {
  const apiUrl = url.back + url.endpoints.addProfile;
  let response = null;
  await axios.post(apiUrl, newProfile)
    .then(data => response = { success: true, data: data })
    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}


export const authProfile = async (profile: IAuthProfileRequest) => {
  const apiUrl = url.back + url.endpoints.authProfile;
  return await axios.post<IAuthProfileResponse>(apiUrl, profile)
  // .then(data => response = { success: true, data: data.data })
  // .catch((error) => {
  //   response = { success: false, data: error.response.data }
  // });
}

export const profileInfo = async (id: number) => {
  const userJWT = getUser().jwt;
  const apiUrl = url.back + url.endpoints.getProfileInfo + id;
  return await axios.get(apiUrl, {
    headers: {
      Authorization: userJWT
    }
  })
  // .then(data => response = { success: true, data: data.data })
  // .catch((error) => {
  //   response = { success: false, data: error.response.data }
  // });
}

export const getRegistrationNames = async () => {

  const apiUrl = url.back + url.endpoints.getAllNames;
  return await axios.get(apiUrl)
  // .then(data => response = { success: true, data: data.data })
  // .catch((error) => {
  //   response = { success: false, data: error.response.data }
  // });
}