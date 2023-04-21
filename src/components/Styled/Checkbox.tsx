import { FC } from "react";
import styled from "styled-components";
import { InputProps } from "../../types/props";

const SCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  margin: 0 14px 14px;
`;

const SContainer = styled.div<{ disabled?: boolean }>`
  display: flex;

  label {
    ${(props) =>
      props.disabled &&
      `
      pointer-events:none;
      color: #a5a5a5;
    `}
  }
`;

const Checkbox: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  ...rest
}) => {
  return (
    <SContainer disabled={rest.disabled}>
      <SCheckbox
        error={error}
        autoComplete="off"
        id={name}
        {...register(name)}
        {...rest}
      />
      {label && <label htmlFor={name}>{label}</label>}
    </SContainer>
  );
};

export default Checkbox;
