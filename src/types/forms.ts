import { ReactElement, ReactNode } from "react";
import { UseControllerProps } from "react-hook-form";

export type RegistrationFormValues = {
  username: string;
  password: string;
  name?: string;
}

export type TournamentFormValues = {
  cost: number,
  date_time: Date,
  division: number,
  location: string,
  organizer: string,
  phone: string,
  rating_range: string,
  reserve: number,
  tournament_name: string,
  team: 0
}

export type AuthFormValues = {
  login: string;
  password: string;
}

export interface IAuthFormsProps {
  changeForm: () => void;
  closeFormModal: () => void;
}

export type RegistrationFormStyleProps = {
  placeholder: string;
}

export type RegistrationFormProps<T> = {
  placeholder: string;
} & UseControllerProps<T>


export type LargeForm = {
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  children: ReactElement<any, any>[];
  largeForm?: boolean
}

export type classNameType = string;
export type childrenType = ReactNode;

export interface IFormProps {
  defaultValues?: any;
  children?: childrenType;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: any;
  className?: classNameType;
  largeForm?: boolean
  formTitle?: string
}


