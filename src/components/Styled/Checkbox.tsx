import { FC } from "react";
import styled from 'styled-components';
import { InputProps } from '../../types/props';

const SCheckbox = styled.input.attrs({
  type: 'checkbox'
})`

  margin:0 14px 14px;

`

const Checkbox: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  ...rest
}) => {

  return (
    <div>

      <SCheckbox
        error={error}
        autoComplete='off'
        id={name}
        {...register(name)}
        {...rest} />
      {label && <label htmlFor={name} >{label}</label>}
    </div>
  )
}

export default Checkbox