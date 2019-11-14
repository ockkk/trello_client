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
    }
  }

  getUserName = name => {
    this.setState({
      userName: name
    })
  }
  render() {
    console.log("[USERNAME]",this.state)
    return (
      <div>
      <header> <h1>Trello</h1></header>
      <Router>
          <Route exact path="/" component={() => <Signin getUserName={this.getUserName}/>}/>
          <Route  path="/signup" component={Signup}/>
          <Switch>
            <Route exact path="/boards" component={() => <BoardList userName={this.state.userName}/>}/>
            <Route path="/boards/:id" component={TodoList}/>
            <Route path="/info" component={Userpage}/>
          </Switch>
      </Router>
      </div>
   )
  }
}

