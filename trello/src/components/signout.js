import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap';


export default class signout extends Component {
  state = {
    signout: false
  }

  handleSignout= e => {
    sessionStorage.removeItem("token")
    alert("로그아웃 되었습니다.👋🏻")
    this.setState({signout: true})
  }

  render() {
    return (
      <div>
      {
       this.state.signout && <Redirect to="/"/>
      }
       <Button color="info" onClick={this.handleSignout}>logout</Button>{' '}
    </div>
    )
  }
}
