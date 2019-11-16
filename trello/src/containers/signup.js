import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input, Col, Container, Label, Form, FormGroup, CardText} from 'reactstrap';

export default class signup extends Component {
  constructor(){
  super()
  this.state = {
      name: "",
      email: "",
      password: "",
      success: false
    }
  }

  handleName = e => {
    this.setState({
      name: e.target.value
    })
  }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  handlePw = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleSignup = async e => {
    if(this.state.name === ""){
      alert("name을 입력해 주세요!!🙅🏻‍♂️")
    }
    if(this.state.email === ""){
      alert("email 입력해 주세요!!🙅🏻‍♂️")
    }
    if(this.state.password === ""){
      alert("password 입력해 주세요!!🙅🏻‍♂️")
    }

    let message = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {"Content-type": "application/json"}
      }

    let result = await fetch("http://127.0.0.1:8080/users", message)
      .then(date => {return date.json()})
    this.setState({success: result.success})
    alert(result.message)
  }

  render() {
    return (
      <div>
        {
          this.state.success && <Redirect to="/"/>
        }

        <Col sm="12" md={{ size: 4, offset: 4 }} style={{position:"relative", top:"110px"}}>
          <Container style={{border:"1px solid #d8d8d8", padding:"1em 1em 1em", borderRadius:"4px"}}>
            <CardText style={{fontSize:"80px", marginBottom:"40px"}}>Sign up</CardText>
            <Form>
              <FormGroup row>
              <Label lg={3}> Name </Label>
              <Col lg={9} style={{marginBottom:"10px"}}>
                <Input type="name" name="name" id="name" placeholder="name" onChange={this.handleName} />
              </Col>
              <Label lg={3}> E_mail </Label>
              <Col lg={9} style={{marginBottom:"10px"}}>
                <Input type="email" name="email" id="email" placeholder="email" onChange={this.handleEmail}/>
              </Col>
              <Label lg={3}> Password </Label>
              <Col lg={9} style={{marginBottom:"10px"}}>
                <Input type="password" name="password" id="password" placeholder="password" onChange={this.handlePw}/>
              </Col>
              <Col lg={12} style={{marginTop:"5px"}}>
              <Button color="primary" size="lg" block onClick={this.handleSignup}>Signup</Button>
              </Col>
              </FormGroup>
            </Form>
          </Container>
        </Col>
    </div>
    )
  }
}
