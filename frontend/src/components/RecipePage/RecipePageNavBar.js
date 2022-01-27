import React from 'react';
import { Button, Container } from 'react-bootstrap';

const RecipePageNavBar = () => {
  return (
    <div>
      <Container>
        <Button>홈</Button>
        <Button>레시피</Button>
        <Button>마이페이지</Button>
        <Button>로그아웃</Button>        
      </Container>
    </div>
  );
};

export default RecipePageNavBar;
