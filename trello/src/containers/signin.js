import React from 'react';
import { Button, Input} from 'reactstrap';

const signin = () => {
  return (
    <div>
      <h2>Trello</h2>
      <Input type="email" name="paemailssword" id="email" placeholder="email"/>
      <Input type="password" name="password" id="password" placeholder="password"/>
      <Button color="info" size="lg" block>Signin</Button>{' '}
      <Button color="info" size="lg" block>Signup</Button>{' '}
    </div>
  );
};

export default signin;