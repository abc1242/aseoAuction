import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
// import samplechart from "../../images/samplechart.png";
import samplechart from "../../../images/samplechart.png";

const RecipePageChart = () => {
  return (
    <div>
      <h1>닭 고기</h1>
      <hr />

      <Row>
        <Col xs={3}>
          <Image src={samplechart}></Image>
        </Col>
        <Col>
          <Card>
            <Card.Img variant='top'></Card.Img>
            <Card.Body>
              <Card.Title><h3>닭 가슴살 샐러드</h3></Card.Title>
              <Card.Text>맛있는 닭 가슴살 샐러드 입니다.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>3분전</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr />

      <Row>
        <Col xs={3}>
          <Image src={samplechart}></Image>
        </Col>
        <Col>
          <Card>
            <Card.Img variant='top'></Card.Img>
            <Card.Body>
            <Card.Title><h3>닭 다리살 샐러드</h3></Card.Title>
              <Card.Text>맛있는 닭 다리살 샐러드 입니다.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>3분전</small>
            </Card.Footer>
          </Card>
        </Col>        
      </Row>
      <hr />

      <Row>
        <Col xs={3}>
          <Image src={samplechart}></Image>
        </Col>
        <Col>
          <Card>
            <Card.Img variant='top'></Card.Img>
            <Card.Body>
              <Card.Title><h3>닭 백숙</h3></Card.Title>
              <Card.Text>맛있는 닭 백숙 입니다.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>3분전</small>
            </Card.Footer>
          </Card>
        </Col>        
      </Row>
      <hr />

      <Row>
        <Col xs={3}>
          <Image src={samplechart}></Image>
        </Col>
        <Col>
          <Card>
            <Card.Img variant='top'></Card.Img>
            <Card.Body>
              <Card.Title><h3>치킨</h3></Card.Title>
              <Card.Text>맛있는 치킨 입니다.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>3분전</small>
            </Card.Footer>
          </Card>
        </Col>        
      </Row>
      <hr /> 
    </div>
  );
};

export default RecipePageChart;
