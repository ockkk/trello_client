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
  
  // componentDidMount(){
  //   this.loginUserName()
  // }

  loginUserName= (name) => {
    console.log(name)
    this.setState({
      userName: name
    })
  }

  logoutUserName= () => {
    console.log("실행")
    console.log(sessionStorage.getItem("token"))
    if(!sessionStorage.getItem("token")){
      this.setState({
        userName: "name"
      })
    }
  }

  render() {
    return (
      <div style={{}}>
      <Router>
        <Navbar color="primary">
          <NavbarBrand  className="title"> 
            <h1 style={{position:"relative", top:"5px", color:"white"}}>
              Trello
            </h1> 
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
              <User userName={this.state.userName} logoutUserName={this.logoutUserName}/>
            </NavItem>
          </Nav>
        </Navbar>
        <Route exact path="/" component={() => <Signin loginUserName={this.loginUserName} />}/>
        <Route  path="/signup" component={Signup}/>
        <Switch>
          <Route exact path="/:name/boards" component={BoardList}/>
          <Route path="/boards/:id" component={TodoList}/>
          <Route path="/userinfo" component={Userpage}/>
        </Switch>
      </Router>
      </div>
   )
  }
}

