import React from 'react';
import { Button, Container, Nav, Image } from "react-bootstrap";

export const RecipePageNavBar = () => {
  return (
    <Container>
      <Button>홈</Button>
      <Button>레시피</Button>
      <Button>마이 페이지</Button>
      <Button>로그아웃</Button>      
    </Container>
  );
};

