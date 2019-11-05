import React, {Component} from 'react';
import board from '../components/board'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Button } from 'reactstrap';

export default class boardList extends Component {
  render() {
    return (
      <div>
        <Router>
          <Button color="info">logout</Button>{' '}
          <Route component={board}/>
          <Button color="warning">name</Button>{' '}
        </Router>
      </div>
    )
  }
}
