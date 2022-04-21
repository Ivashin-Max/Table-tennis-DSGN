import React from 'react';
import styled from 'styled-components';

const SButton = styled.button<any>`
   height: 41px;
   width: 240px;
   display: block;
   margin: 12px 0;
   border-radius: 7px;
   color: white;
   transition: 0.4s ease;
   font-size: 14px;
   font-family: 'OpenSans';
   font-weight: 600;
   background-color: #39aea8;

   &:hover{
    background-color: white;
     color: #39AEA9;
     transition: background-color 0.4s ease;
     border: 2px solid #39AEA9;
   }
   ${props => props.small && `
    height: 30px;
    width: 140px;
    margin: 0 auto 10px;
   `}
`

const Button = (props: any) => {
  return (
    <SButton {...props} />
  )
}

export default Button