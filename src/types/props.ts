import { InputHTMLAttributes } from "react";


export type ModalMsgProps = {
  message: string
}
export type AuthModalProps = {
  isAuthorized: boolean
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
}
export type EditableInputProps = {
  editable?: boolean
  title: string,
  id: number,
  user: any
}

export type TableFioProps = {
  participant: any;
  currentTournament: any;
  zapas?: boolean;
  adminMode?: boolean;
}

export type TableProps = {
  adminMode?: boolean;
}