import React, { Component } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  color: #42387a;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 5px 0 10px 0;
  text-align: left; 
`;

const MessageContainer = styled.div`
  width: 100%;
`;

const Text = styled.p`
  font-size: 2rem;
  width: 100%;
`;

class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <MessageContainer>
        <Username>{userName}</Username>
        <Text>{text}</Text>
      </MessageContainer>
    );
  }
}

export default Message;