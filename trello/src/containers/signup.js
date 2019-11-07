import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input} from 'reactstrap';

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
    console.log(this.state)
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
        <h2>
          Sign up
        </h2>
        <Input type="name" name="name" id="name" placeholder="name" onChange={this.handleName}/>
        <Input type="email" name="email" id="email" placeholder="email" onChange={this.handleEmail}/>
        <Input type="password" name="password" id="password" placeholder="password" onChange={this.handlePw}/>
        <Button color="info" size="lg" block onClick={this.handleSignup}>Signup</Button>
    </div>
    )
  }
}
