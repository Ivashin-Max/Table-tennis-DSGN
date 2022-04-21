import axios from "axios";
import url from '../../static/url.json'
import { IProfileGet } from "../../types/fetch";
import { IAuthProfileRequest, IAuthProfileResponse, INewProfile, INewProfileResponse, IPatchProfileRequest } from "../../types/profile";
import { getUser } from "../localStorage";

export const newProfile = async (newProfile: INewProfile) => {
  const apiUrl = url.back + url.endpoints.profile;
  return await axios.post<INewProfileResponse>(apiUrl, newProfile)
}


export const authProfile = async (profile: IAuthProfileRequest) => {
  const apiUrl = url.back + url.endpoints.authProfile;
  return await axios.post<IAuthProfileResponse>(apiUrl, profile)
}

export const patchProfile = async (profile: IPatchProfileRequest) => {
  const apiUrl = url.back + url.endpoints.profile;
  const userJWT = getUser().jwt;
  return await axios.patch(apiUrl, profile, {
    headers: {
      Authorization: userJWT
    }
  })
}

export const profileInfo = async (id: number) => {
  const userJWT = getUser().jwt;
  const apiUrl = url.back + url.endpoints.profile;
  return await axios.get<IProfileGet>(apiUrl, {
    headers: {
      Authorization: userJWT
    }
  })
}

export const getRegistrationNames = async () => {
  const apiUrl = url.back + url.endpoints.getAllNames;
  return await axios.get(apiUrl)
}