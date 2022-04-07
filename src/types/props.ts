import { InputHTMLAttributes } from "react";


export type ModalMsgProps = {
  message: string
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
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