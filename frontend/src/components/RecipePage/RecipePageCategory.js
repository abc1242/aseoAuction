import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

export const RecipePageCategory = () => {
  return (
    <div>
      <ButtonGroup vertical>
        # 카테고리
        <Button>추천 레시피</Button>
        <hr />
        <Button>고단백</Button>
        <Button>키토</Button>
        
        <DropdownButton as={ButtonGroup} title="닭 고기" id="bg-vertical-dropdown-3">
          <Dropdown.Item eventKey="1">닭 가슴살</Dropdown.Item>
          <Dropdown.Item eventKey="2">닭 다리살</Dropdown.Item>
          <Dropdown.Item eventKey="3">닭 요리</Dropdown.Item>
        </DropdownButton>

        <DropdownButton as={ButtonGroup} title="한식" id="bg-vertical-dropdown-3">
          <Dropdown.Item eventKey="1">경상도 음식</Dropdown.Item>
          <Dropdown.Item eventKey="2">전라도 음식</Dropdown.Item>
          <Dropdown.Item eventKey="3">충청도 음식</Dropdown.Item>
          <Dropdown.Item eventKey="4">강원도 음식</Dropdown.Item>
          <Dropdown.Item eventKey="5">경기도 음식</Dropdown.Item>
          <Dropdown.Item eventKey="6">제주도 음식</Dropdown.Item>
          <Dropdown.Item eventKey="7">이북 음식</Dropdown.Item>
        </DropdownButton>

        <DropdownButton as={ButtonGroup} title="파스타" id="bg-vertical-dropdown-3">
          <Dropdown.Item eventKey="1">한식 파스타</Dropdown.Item>
          <Dropdown.Item eventKey="2">이탈리안 파스타</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
};
