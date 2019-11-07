import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './containers/signin'
import Signup from './containers/signup'
import TodoList from './containers/todoList'
import BoardList from './containers/boardList'
import Userpage from './containers/userpage'


export default class App extends Component {
  constructor(){
    super()
    this.state={
      userName: "",
      isLogin: null
    }
  }
  render() {
    return (
      <div>
      <Router>
          <Route exact path="/" component={() => <Signin value= {this.state}/>}/>
          <Route  path="/signup" component={Signup}/>
          <Switch>
            <Route exact path="/boards" component={BoardList}/>
            <Route path="/boards/:id" component={TodoList}/>
            <Route path="/info" component={Userpage}/>
          </Switch>
      </Router>
      </div>
   )
  }
}

