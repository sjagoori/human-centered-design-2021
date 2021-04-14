import React from 'react'
import styled, { ThemeProvider } from 'styled-components';

export default class Block extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Container></Container>
      </>
    )
  }
}

const Container = styled.div` 
  text-transform: capitalize;
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background-color: red;

`