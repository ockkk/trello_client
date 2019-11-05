import React from 'react';
import { Button, Input} from 'reactstrap';

const signup = () => {
  return (
    <div>
      <h2>
        Sign up
      </h2>
      <Input vaild type="name" name="name" id="name" placeholder="name" />
      <Input vaild type="email" name="email" id="email" placeholder="email" />
      <Input type="password" name="password" id="password" placeholder="password"/>
      <Button color="info" size="lg" block>Signup</Button>{' '}
    </div>
  );
};

export default signup; 