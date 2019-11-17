import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Container, Button, Input, Form, FormGroup, Label, Col, CardTitle} from 'reactstrap';

export default class signin extends Component {
  constructor(props){
    super()
    this.state = {
      email: "",
      password: "",
      success: null
    }
  }

  validToken = () => {
    if(!sessionStorage.getItem("token")){
      this.setState({success: null})
    }
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

  handelLogin = async e => {
    let loginInfo = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {"Content-type": "application/json"}
      }

    let result = await fetch("http://54.180.144.153:8080/users/signin", loginInfo)
      .then(date => {return date.json()})

    sessionStorage.setItem("token",result.token)
    alert(result.message)
    this.setState({success: result.success})
  }

  render() {
    return (
      <div>
      {
        this.state.success && sessionStorage.getItem("token") && <Redirect to="/boards"/>
      }
      <Col sm="12" md={{ size: 4, offset: 4 }} style={{position:"relative", top:"110px"}}>
        <Container style={{border:"1px solid #d8d8d8", padding:"1em 1em 1em", borderRadius:"4px"}}>
          <CardTitle style={{fontSize: "80px", marginBottom: "40px"}}>Trello</CardTitle>
          <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="paemailssword" id="email" placeholder="email" onChange={this.handleEmail}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" id="password" placeholder="password" onChange={this.handlePw}/>
            </Col>
          </FormGroup>      
          <Button color="primary" size="lg" block onClick={this.handelLogin}>Signin</Button>
          <Link to="/signup">
          <div style={{margin: "10px"}}/>
          <Button color="primary" size="lg" block>Signup</Button>
          </Link>
          </Form>
        </Container>
      </Col>
    </div>
    )
  }
}