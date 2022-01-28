import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
  return (
    <div>
      <InputGroup className='mb-3'>
        <FormControl 
          placeholder="레시피를 검색해보세요"
          aria-label=""
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          검색
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
