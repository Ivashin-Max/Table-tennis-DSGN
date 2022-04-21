import { AxiosRequestConfig } from "axios";

export interface INewProfile {
  name?: string,
  username: string,
  password: string
}

export interface IAuthProfileRequest {
  username: string,
  password: string
}

export interface IPatchProfileRequest {
  telegram_id: number,
  rttf_id: number
}

export interface INewProfileResponse {
  data: string
}

export interface IAuthProfileResponse {
  access_token: string,
  admin: number,
  id: number
}

export interface IAxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}