import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Button, Input, InputGroup, Modal, ModalFooter, ModalHeader, Form, FormGroup, Label, Col, Container, CardText} from 'reactstrap';


export default class userpage extends Component {
  state ={
    userCheck: false,
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

    let result = await fetch("http://54.180.115.9:8080/users/", modifyInfo)
      .then(date => date.json())
      .catch(err => console.log(err))

    alert(result.message)
    this.setState({userCheck: false})
  }

  modifyPassword= async () => {
    if((this.state.password || this.state.passwordCheck )=== ""){
      alert("값을 입력해 주세요 ✍🏻")
      return
    }
    if(this.state.password !== this.state.passwordCheck){
      alert("비밀번호가 다릅니다!!😑")
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

    let result = await fetch("http://54.180.115.9:8080/users/", modifyInfo)
      .then(date => date.json())

    alert(result.message)
    this.setState({
      changePassword: "true",
      password: "",
      passwordCheck: ""
    })
    sessionStorage.removeItem("token")
  }

  deleteUser= async () => {
    if(this.state.password === ""){
      alert("비밀번호를 입력해 주세요😠")
      return 
    }
    
    let deleteInfo = {
      method: "DELETE",
      body: JSON.stringify({password: this.state.password}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    let result = await fetch("http://54.180.115.9:8080/users/", deleteInfo)
      .then(date => date.json())

    alert(result.message)
    this.setState({
      password: "",
    })
    sessionStorage.removeItem("token")
  }
  
  render() {
    return (
      <div>
        {this.state.changePassword && <Redirect to="/"/>}
        <Col sm="12" md={{ size: 4, offset: 4 }} style={{position:"relative", top:"110px"}}>
        <Container style={{border:"1px solid #d8d8d8", padding:"1em 1em 1em", borderRadius:"4px"}}>
        <CardText style={{fontSize:"80px", marginBottom:"40px"}}>User Info</CardText>
        <Form>
          <FormGroup row>
            <Label  lg={3}>Change Name</Label>
            <Col lg={9}>
              <Input type="name" id="name" placeholder="name" onChange={this.handleNmae}/>
              <div style={{margin:"8px"}}/>
              <Button color="primary" size="lg" block onClick={this.signup} onClick={this.modifyName}>name modify</Button> 
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
              <Button color="primary" size="lg" block onClick={this.signup} onClick={this.modifyPassword}>password modify</Button>
            </Col>
          </FormGroup> 
            <Button color="secondary" onClick={this.handleModal} style={{width:"100%", height:"45px"}}>
              회원 탈퇴
            </Button>
          <Modal isOpen={this.state.modal} fade={false} toggle={this.handleModal}>
            <ModalHeader>회원 탈퇴</ModalHeader>
            <ModalFooter>
              <Input type="password" id="password" placeholder="password" onChange={this.handlePassword}/>
              <Button color="light" onClick={this.deleteUser} style={{width:"30%"}}>탈퇴</Button>
              <Button color="primary" onClick={this.handleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
         </Form>
         </Container>
         </Col>
      </div>
    )
  }
}
