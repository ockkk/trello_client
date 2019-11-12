import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Button, Input, InputGroup, Modal, ModalFooter, ModalHeader, Form, FormGroup, Label, Col, Container} from 'reactstrap';
import "../css/page.css"

export default class userpage extends Component {
  state ={
    userCheck: true,
    changePassword: false,
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    modal: false
  }

  handleNmae= e =>{
    this.setState({
        name: e.target.value
    })
  }

  handleEmail= e =>{
    this.setState({
        email: e.target.value
    })
  }

  handlePassword= e =>{
    this.setState({
        password: e.target.value
    })
  }
  handlePasswordCheck= e => {
    this.setState({
      passwordCheck: e.target.value
    })
  }

  handleModal= () => {
    this.state.modal ? this.setState({ modal : false}) : this.setState({ modal: true})
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

    let result = await fetch("http://127.0.0.1:8080/users/checkUser", CheckInfo)
      .then(date => date.json())
    
    alert(result.message)
    this.setState({userCheck: result.success})
  }

  modifyName= async () => {
    if(this.state.name === ""){
      alert("값을 입력해 주세요")
      return
    }
    let modifyInfo = {
      method: "PUT",
      body: JSON.stringify({name: this.state.name}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
      }

    let result = await fetch("http://127.0.0.1:8080/users/", modifyInfo)
      .then(date => date.json())

    alert(result.message)
    this.setState({userCheck: false})
  }

  modifyPassword= async () => {
    if(this.state.password !== this.state.passwordCheck){
      alert("비밀번호가 다릅니다!!😑")
      return
    }

    if((this.state.password || this.state.passwordCheck )=== ""){
      alert("값을 입력해 주세요 ✍🏻")
      return
    }
    let modifyInfo = {
      method: "PUT",
      body: JSON.stringify({password: this.state.password}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    let result = await fetch("http://127.0.0.1:8080/users/", modifyInfo)
      .then(date => date.json())

    alert(result.message)
    this.setState({
      password: "",
      passwordCheck: ""
    })
    sessionStorage.removeItem("token")
  }

  deleteUser= async () => {
    let deleteInfo = {
      method: "DELETE",
      body: JSON.stringify({password: this.state.password}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    let result = await fetch("http://127.0.0.1:8080/users/", deleteInfo)
      .then(date => date.json())

    alert(result.message)
    this.setState({
      password: "",
    })
    sessionStorage.removeItem("token")
  }

  render() {
    console.log("[STATE]",this.state)
    return (
      <div>
        {!sessionStorage.getItem("token") && <Redirect to="/"/>}
        {this.state.userCheck ?     
        (
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{position:"relative", top:"180px"}}>
        <Container className="form">
        <h1>User page</h1>
        <Form>
          <FormGroup row>
            <Label  lg={3}>Change Name</Label>
            <Col lg={9}>
              <Input type="name" id="name" placeholder="name" onChange={this.handleNmae}/>
              <div style={{margin:"8px"}}/>
              <Button color="info" size="lg" block onClick={this.signup} onClick={this.modifyName}>name modify</Button> 
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label  sm={3}>Password</Label>
            <Col sm={9}>
              <Input type="password" id="password" placeholder="password" onChange={this.handlePassword}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label  sm={3}>Check password</Label>
            <Col sm={9}>
              <Input type="password" id="password2" placeholder="password" onChange={this.handlePasswordCheck}/>
              <div style={{margin:"8px"}}/>
              <Button color="info" size="lg" block onClick={this.signup} onClick={this.modifyPassword}>password modify</Button>
            </Col>
          </FormGroup> 
            <Button color="secondary" onClick={this.handleModal} style={{width:"100%", height:"45px"}}>
              회원 탈퇴
            </Button>
          <Modal isOpen={this.state.modal} fade={false} toggle={this.handleModal}>
            <ModalHeader>회원 탈퇴</ModalHeader>
            <ModalFooter>
              <Input type="password" id="password" placeholder="password" onChange={this.handlePassword}/>
              <Button color="primary" onClick={this.deleteUser}>탈퇴</Button>
              <Button color="secondary" onClick={this.handleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
         </Form>
         </Container>
         </Col>
         )
        :
        <InputGroup>
          <Input type="password" id="changePassword" placeholder="password" onChange={this.handlePassword}/>
          <Button onClick={this.checkUser}>check</Button>
        </InputGroup>}
      </div>
    )
  }
}
