import React, { Component } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  color: #42387a;
  font-size: 1rem;
  font-weight: 600;
  padding: 5px 0 10px 0;
  text-align: left; 
`;

const MessageContainer = styled.div`
  width: 100px;
`;

const Text = styled.p`
  font-size: 2rem;
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