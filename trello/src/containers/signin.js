import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input} from 'reactstrap';

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

    let result = await fetch("http://127.0.0.1:8080/users/signin", loginInfo)
      .then(date => {return date.json()})

    sessionStorage.setItem("token",result.token)
    alert(result.message)
    this.setState({success: result.success})
  }

  render() {
    return (
      <div>
      {
          this.state.success && <Redirect to="/boards"/>
        }
      <h2>Trello</h2>
      <Input type="email" name="paemailssword" id="email" placeholder="email" onChange={this.handleEmail}/>
      <Input type="password" name="password" id="password" placeholder="password" onChange={this.handlePw}/>
      <Button color="info" size="lg" block onClick={this.handelLogin}>Signin</Button>
      <Button color="info" size="lg" block>Signup</Button>
    </div>
    )
  }
}