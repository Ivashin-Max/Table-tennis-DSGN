import React from 'react';
import styled from 'styled-components';

const STitle = styled.p<any>`
  margin-bottom: 14px;
  text-align:center;
  cursor: ${props => props.pointer ? "pointer" : 'default'};
  font-size: ${props => props.fz ? props.fz : 'inherit'};
  ${props => props.capitalize && `
    text-transform:capitalize;
  `}
`

const Title = (props: any) => {
  return (
    <STitle {...props} />
  )
}

export default Title