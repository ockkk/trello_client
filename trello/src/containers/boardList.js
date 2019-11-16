import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Input} from 'reactstrap';

export default class boardList extends Component {
  state ={
    boards:[],
    boardKey:"",
    addBoard:"",
    modifyBoard:"",
    modal: false,
    modifyModal: false
  }
  
  componentDidMount(){
    this.callBoard();
  }
  
  handleBoardName= e => {
    this.setState({
      addBoard: e.target.value
    })
  }

  handleModifyBoardName= e => {
    this.setState({
      modifyBoard: e.target.value
    })
  }

  handleModal= () => {
    this.state.modal ? this.setState({ modal : false}) : this.setState({ modal: true})
  }

  handleModifyModal= e => {
    this.setState({
      boardKey: e.target.id
    })
    this.state.modifyModal ? this.setState({ modifyModal : false}) : this.setState({ modifyModal: true})
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

  updateBoard= async e => {
    if(this.state.modifyBoard === ""){
      alert("내용을 입력해 주세요!!")
      return
    }
    let b_key = this.state.boardKey
    let message = {
      method: "PUT",
      body: JSON.stringify({b_name:this.state.modifyBoard}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }

    await fetch(`http://127.0.0.1:8080/boards/${b_key}`, message)
    .then(data => data.json())
    .then(res => alert(res.message))
    .catch(err => console.log(err))

    this.setState({
      boardKey: "",
      modifyBoard: "",
      modifyModal: false
    })

    this.callBoard()
  }

  render() {
    return (
      <div style={{height:"100vh"}}>
        {!sessionStorage.getItem("token") && <Redirect to="/"/>}
        {this.state.boards.map((board, index) => 
          <ButtonGroup key={index} vertical style={{margin:"10px"}}>
            <Link to = {`boards/${board.b_key}`} key={index}>
              <Button color= "primary" key={board.b_key} style={{width:"250px", height:"130px"}}>
                {board.b_name}
              </Button>
            </Link>
              <ButtonGroup>
                <Button id={board.b_key} onClick={this.handleModifyModal} color="light"> Modify </Button>
                <Modal isOpen={this.state.modifyModal} fade={false} toggle={this.handleModifyModal}>
                  <ModalHeader>Modify Board</ModalHeader>
                  <ModalBody>
                    <Input type="textarea" color="primary" onChange={this.handleModifyBoardName}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" id={board.b_key} onClick={this.updateBoard}>Modify</Button>
                    <Button color="secondary" onClick={this.handleModifyModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                <Button color="light" id={board.b_key} onClick={this.deleteBoard}>x</Button>
              </ButtonGroup>
          </ButtonGroup>
          )}
        <Button color="secondary" onClick={this.handleModal} style={{width:"250px", height:"130px", margin: "10px"}}>
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
