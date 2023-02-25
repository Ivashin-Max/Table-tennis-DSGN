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
  coachCityId?: number;
  resetField?: any;
  onlyAllowedOptions?: boolean;
}
export type EditableInputProps = {
  editable?: boolean;
  title: string;
  id: number;
  user: any;
};

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
