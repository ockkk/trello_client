import React, {Component} from 'react';
import Signout from '../components/signout'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Input, Col, Row } from 'reactstrap';

export default class boardList extends Component {
  state ={
    boards:[],
    addBoard:"",
    modal: false
  }
  
  componentDidMount(){
    this.callBoard();
  }
  
  handleBoardName= e => {
    this.setState({
      addBoard: e.target.value
    })
  }

  handleModal= () => {
    this.state.modal ? this.setState({ modal : false}) : this.setState({ modal: true})
  }
  
  callBoard= async () => {
    let message = {
      method: "GET",
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }
      
      let boards = await fetch("http://127.0.0.1:8080/boards", message)
      .then(date => date.json())
      .catch(err => console.log(err))
      
      this.setState({
      boards: boards
    })
  }

  addBoard= async () => {
    if(this.state.addBoard === ""){
      alert("이름을 입력해 주세요!!😠")
      return 
    }

    let message = {
      method: "POST",
      body: JSON.stringify({b_name:this.state.addBoard}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    await fetch("http://127.0.0.1:8080/boards", message)
      .then(data => data.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
    
      this.setState({
        addBoard: "",
        modal: false
      })

      this.callBoard()
  }
    

  deleteBoard= async e => {
    let b_key = e.target.id
    console.log(b_key)
    let message = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    await fetch(`http://127.0.0.1:8080/boards/${b_key}`, message)
    .then(data => data.json())
    .then(res => alert(res.message))
    .catch(err => console.log(err))

    this.callBoard()
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <div>
        <Signout/>
        <Link to ="/info">
          <Button color="warning">name</Button>
        </Link>
        </div>
        {
          this.state.boards.map((board, index) => 
          <ButtonGroup key={index}>
            <Link to = {`boards/${board.b_key}`} key={index}>
              <Button color= "primary" key={board.b_key}>
                {board.b_name}
              </Button>
            </Link>
            <div/>
              <Button color="primary" id={board.b_key} onClick={this.deleteBoard}>x</Button>
          </ButtonGroup>
          )
        }
        <Button color="secondary" onClick={this.handleModal}>
          create new board
        </Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.handleModal}>
          <ModalHeader>add Board</ModalHeader>
          <ModalBody>
            <Input type="textarea" color="primary" onChange={this.handleBoardName}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBoard}>Add</Button>
            <Button color="secondary" onClick={this.handleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
