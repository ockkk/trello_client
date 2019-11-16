import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Navbar, NavbarBrand, NavItem, Nav, Button} from 'reactstrap'
import "./App.css"
import Signin from './containers/signin'
import Signup from './containers/signup'
import User from './components/userBtn'
import TodoList from './containers/todoList'
import BoardList from './containers/boardList'
import Userpage from './containers/userpage'


export default class App extends Component {
  state={
    userName:"name"
  }

  loginUserName= name => {
    this.setState({
      userName: name
    })
  }

  logoutUserName= () => {
    this.setState({
      userName: "name"
    })
  }

  render() {
    console.log(this.props)
    return (
      <div style={{overflow: "auto", scrollbarWidth: "auto"}}>
      <Router>
        <Navbar color="primary">
          <NavbarBrand href="/" className="title"> 
            <h2 style={{position:"relative", top:"5px"}}>
              Trello
            </h2> 
          </NavbarBrand>
          <Nav>
            <NavItem>
            <Link to="/boards">
              <Button color="outline-light"  style={{width: "100px", marginRight: "5px", height: "50px"}}> 
                Board 
              </Button> 
            </Link>   
            </NavItem>
            <NavItem> 
              <User userName={this.state.userName} loginUserName={this.loginUserName} logoutUserName={this.logoutUserName}/>
            </NavItem>
          </Nav>
        </Navbar>
        <Route exact path="/" component={() => <Signin />}/>
        <Route  path="/signup" component={Signup}/>
        <Switch>
          <Route exact path="/boards" component={() => <BoardList/>}/>
          <Route path="/boards/:id" component={TodoList}/>
          <Route path="/userinfo" component={Userpage}/>
        </Switch>
      </Router>
      </div>
   )
  }
}

