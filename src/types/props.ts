import { AxiosResponse } from "axios";
import { InputHTMLAttributes } from "react";

export type ModalMsgProps = {
  message: string;
};
export type AuthModalProps = {
  isAuthorized: boolean;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  coachCityId?: number | null;
  resetField?: any;
  onlyAllowedOptions?: boolean;
  sx?: any;
  optionsFetch?: any;
  refetchFlag?: unknown;
  resetOptions?: boolean;
  optionsFetchCallback?: (optionsFetched: any[]) => void;
  defaultOptions?: any[];
  noOptionsText?: string;
  pushedValue?: any;
}

export interface InputCity
  extends Omit<InputProps, "coachCityId" | "resetField"> {
  options: InputCityOption[];
  changeCallback: (value: InputCityOption) => void;
}

export type InputCityOption = { value: string; text: string };

export type EditableInputProps = {
  editable?: boolean;
  title: string;
  id: number;
  user: IUser;
  placeholder?: string;
  inputName: string;
};

interface IUser {
  birth_year: string;
  city: number;
  coach: string;
  division_id: number;
  fio: string;
  id: number;
  play_status_1d: number;
  play_status_2d: number;
  play_status_3d: number;
  play_status_etc: number;
  play_status_vd: number;
  rate_value: number;
  rttf_id: number;
  telegram_id: null;
  tournaments: any[];
  category?: string;
}

export type TableFioProps = {
  participant: any;
  currentTournament: any;
  zapas?: boolean;
  adminMode?: boolean;
  division?: boolean;
  hover?: boolean;
};

export type TableProps = {
  adminMode?: boolean;
};
