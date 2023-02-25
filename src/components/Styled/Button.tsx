import React from "react";
import styled from "styled-components";

const SButton = styled.button<any>`
  height: 41px;
  width: 240px;
  display: block;
  margin: 12px 0;
  border-radius: 7px;
  color: white;
  transition: 0.4s ease;
  font-size: 14px;
  font-family: "OpenSans";
  font-weight: 600;
  background-color: #39aea8;

  &:hover {
    background-color: white;
    color: #39aea9;
    transition: background-color 0.4s ease;
    border: 2px solid #39aea9;
  }
  ${(props) =>
    props.small &&
    `
    height: 30px;
    width: 140px;
    margin: 0 auto 10px;
   `}

  ${(props) =>
    props.divisions &&
    `
    font-size: 17px;
    box-shadow: 2px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    height: 3.285rem; 
    width: 126px;
    border-radius: 10px 0px 0px 10px;
    margin: 0 auto;
    margin-left: 130px;
   `}

  &:disabled {
    pointer-events: none;
    cursor: default;
    background-color: #cec7c8;
  }
`;

const Button = (props: any) => {
  return <SButton {...props} />;
};

export default Button;
