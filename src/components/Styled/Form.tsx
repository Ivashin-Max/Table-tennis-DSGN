import { FC, createElement, ReactNode } from "react";
import styled from "styled-components";
import { IFormProps, LargeForm } from "../../types/forms";
import Button from "./Button";
import Title from "./Title";

const SRegistrationForm = styled.form<LargeForm>`
  ${(props) =>
    props.largeForm &&
    `
        box-shadow: 0px 3px 10px rgb(0 0 0 / 25%);


        background-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        min-width: 525px;
        min-height: 432px;

        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    `}
  padding:10px;
`;

export type classNameType = string;
export type childrenType = ReactNode;

const Form: FC<IFormProps> = ({
  defaultValues,
  buttonLabel = "Submit",
  formTitle = "",
  children,
  onSubmit,
  handleSubmit,
  register,
  disabled,
  ...rest
}) => {
  return (
    <SRegistrationForm onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
      <>
        <Title>{formTitle}</Title>
        {Array.isArray(children)
          ? children.map((child) => {
              if (!child) return child;
              // if (!child.type) return child
              return child.props.name
                ? createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </>
      <Button disabled={disabled}>{buttonLabel}</Button>
    </SRegistrationForm>
  );
};

export default Form;
