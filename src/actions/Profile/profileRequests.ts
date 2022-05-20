import axios from "axios";
import url from '../../static/url.json'
import { IProfileGet } from "../../types/fetch";
import { IAuthProfileRequest, IAuthProfileResponse, INewPass, INewProfile, INewProfileResponse, IPatchProfileRequest } from "../../types/profile";
import { getUser } from "../localStorage";

export const newProfile = (newProfile: INewProfile) => {
  const apiUrl = url.back + url.endpoints.profile;
  return axios.post<INewProfileResponse>(apiUrl, newProfile)
}


export const authProfile = (profile: IAuthProfileRequest) => {
  const apiUrl = url.back + url.endpoints.authProfile;
  return axios.post<IAuthProfileResponse>(apiUrl, profile)
}

export const patchProfile = (profile: IPatchProfileRequest) => {
  const apiUrl = url.back + url.endpoints.profile;
  const userJWT = getUser().jwt;
  return axios.patch(apiUrl, profile, {
    headers: {
      Authorization: userJWT
    }
  })
}

export const profileInfo = (id: number) => {
  const userJWT = getUser().jwt;
  const apiUrl = url.back + url.endpoints.profile;
  return axios.get<IProfileGet>(apiUrl, {
    headers: {
      Authorization: userJWT
    }
  })
}

export const getRegistrationNames = () => {
  const apiUrl = url.back + url.endpoints.getAllNames;
  return axios.get(apiUrl)
}

export const sendEmailToResetPass = (email: string) => {
  const apiUrl = url.back + url.endpoints.sendResetEmail + email;
  return axios.get(apiUrl)
}

export const newPass = (newPass: INewPass, jwt: string) => {
  const apiUrl = url.back + url.endpoints.newPass;
  return axios.post(apiUrl, newPass, {
    headers: {
      Authorization: jwt
    }
  })
}

