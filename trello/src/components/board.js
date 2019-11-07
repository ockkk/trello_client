import React from 'react';
import { Button } from 'reactstrap';

const board = (props) => {
  console.log(props)
  return (
    <div>
      <Button color="primary" size="lg"> {props.children} </Button>
    </div>
  );
};

export default board;