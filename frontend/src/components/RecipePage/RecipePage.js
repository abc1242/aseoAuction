import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RecipePageCategory from './RecipePageCategory';
import RecipePageChart from './RecipePageChart';
import RecipePageNavBar from './RecipePageNavBar';
import SearchBar from './SearchBar';

const RecipePage = () => {
  return (
    <div>
      <Container>
        <RecipePageNavBar />
        <SearchBar />

        <Row>
          <Col xs={2}>
            <RecipePageCategory />
          </Col>

          <Col>
            <RecipePageChart />
          </Col>
        </Row>        
        
      </Container>
    </div>
  );
};

export default RecipePage;
