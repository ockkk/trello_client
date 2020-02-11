import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalFooter, ModalHeader, Input, Button } from 'reactstrap';


export default class signout extends Component {
  state = {
    signout: false,
    userCheck: false,
    password:"",
    modal: false
  }
  
  handlePassword= e =>{
    this.setState({
        password: e.target.value
    })
  }

  handleModal= () => {
    this.state.modal ? this.setState({ modal : false}) : this.setState({ modal: true})
  }

  handleSignout= e => {
    if(!sessionStorage.getItem("token")){
      alert("로그인 해주세요!!") 
      return
    }
    sessionStorage.removeItem("token")
    alert("로그아웃 되었습니다.👋🏻")
    this.setState({
      signout: true,
    })
    this.props.logoutUserName()
  }

  checkUser= async () => {
    let CheckInfo = {
      method: "POST",
      body: JSON.stringify({password: this.state.password}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    let result = await fetch("http://54.180.115.9:8080/users/checkUser", CheckInfo)
      .then(date => date.json())

    if(result.message === "jwt malformed"){
      alert("로그인 해주세요!!😠")
      return
    }
    alert(result.message)
    this.setState({
      userCheck: result.success, 
      password: "",
      modal: false
    })
  }

  render() {
    return (
      <div>
      {
       this.state.signout && <Redirect to="/"/>
      }
      {this.state.userCheck && <Redirect to="/userinfo"/>}
      <UncontrolledDropdown>
        <DropdownToggle color="outline-light" style={{width: "100px", height: "50px", float:"left"}}>
        {this.props.userName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem  onClick={this.handleSignout}>
            logout
          </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.handleModal}>
            {/* <Link to="/userinfo" style={{color:"black"}}> */}
              User Info
            <Modal isOpen={this.state.modal} fade={false} toggle={this.handleModal}>
            <ModalHeader>User Check</ModalHeader>
            <ModalFooter>
              <Input type="password" id="password" placeholder="password" onChange={this.handlePassword}/>
              <Button color="primary" onClick={this.checkUser} style={{width:"30%"}}>Check</Button>
              <Button color="secondary" onClick={this.handleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
    )
  }
}
