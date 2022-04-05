import React from 'react';
import styled from 'styled-components';

const STitle = styled.p`
  margin-bottom: 14px;
`

const Title = (props: any) => {
  return (
    <STitle {...props} />
  )
}

export default Title