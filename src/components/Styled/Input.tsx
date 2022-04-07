import { FC } from "react";
import styled from 'styled-components';
import Typography from "./Typography";
import { InputProps } from '../../types/props';

const SInput = styled.input<InputProps>`
  display:block;
  margin-bottom: 14px;
  width: 240px;
    height: 33px;
    border: 1px solid #535e692a;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.082);
    border-radius: 2px;
    padding-left: 10px;

    &:focus {
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
      transition: 0.4s ease;
      opacity: 1;
    }
  ${props => props.error && `
    border-color:red
  `} 
`

const Input: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  ...rest
}) => {

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <SInput
        error={error}
        autoComplete='off'
        {...register(name)}
        {...rest} />
      {error && <Typography align='left' color='red'>{error}</Typography>}

    </>
  )
}

export default Input



