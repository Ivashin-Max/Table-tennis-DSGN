import React from 'react';
import styled from 'styled-components';

const STypography = styled.p<any>`
  text-align:${props => props.align};
  color:${props => props.color};
  font-size:${props => props.fz ? props.fz : '14px'};
`

const Typography = (props: any) => {
  return (
    <STypography {...props} />
  )
}

export default Typography