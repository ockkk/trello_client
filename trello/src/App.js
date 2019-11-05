import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import signin from './containers/signin'
import signup from './containers/signup'
import todoList from './containers/todoList'
import boardList from './containers/boardList'
import userpage from './containers/userpage'


export default class App extends Component {
  render() {
    return (
      <div>
      <Router>
          <Route exact path="/" component={signin}/>
          <Route exact path="/signup" component={signup}/>
          <Switch>
            <Route path="/ockkk" component={boardList}/>
            <Route path="/ockkk/todolist" component={todoList}/>
            <Route path="/info" component={userpage}/>
          </Switch>
      </Router>
      </div>
   )
  }
}

