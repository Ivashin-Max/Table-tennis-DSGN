import React from 'react';
import styled from 'styled-components';

const STypography = styled.p<any>`
  text-align:${props => props.align};
  color:${props => props.color};
`

const Typography = (props: any) => {
  return (
    <STypography {...props} />
  )
}

export default Typography