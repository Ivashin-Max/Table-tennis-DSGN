import { FC, FormEvent } from "react";
import styled from "styled-components";
import Typography from "./Typography";
import { InputProps } from "../../types/props";

const STextArea = styled.textarea<InputProps>`
  display: block;
  margin-bottom: 14px;
  width: 240px;
  height: auto;
  border: 1px solid #535e692a;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.082);
  border-radius: 2px;
  padding-left: 10px;
  padding-top: 5px;
  resize: vertical;

  &:focus {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
    transition: 0.4s ease;
    opacity: 1;
  }
  ${(props) =>
    props.error &&
    `
    border-color:red
  `}
`;

const TextArea: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  ...rest
}) => {
  const textareaResizeHandler = (event: FormEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height =
      event.currentTarget.scrollHeight + 1 + "px";
  };

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <STextArea
        error={error}
        autoComplete="off"
        {...register(name)}
        onChange={textareaResizeHandler}
        {...rest}
      />
      {error && (
        <Typography align="left" color="red" fz="12px">
          {error}
        </Typography>
      )}
    </>
  );
};

export default TextArea;
