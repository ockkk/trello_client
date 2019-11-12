import React, { Component } from 'react'
import Signout from "../components/signout"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button,  ListGroup, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import AddContainer from "../components/addCtBtn"
export default class todoList extends Component {
  constructor(props){
    super()
    this.state = {
      boards: [],
      containers: [],
      cdKey:"",
      cd_add:"",
      cd_modify:"",
      ct_add:"",
      ct_modify:"",
      addCtBtn: false
    }
  }

  componentDidMount(){
    this.callContainer();
    this.callBoard();
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

  callContainer= async () => {
    let message = {
      method: "GET",
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }

    let containers = await fetch(`http://127.0.0.1:8080/boards/${this.props.match.params.id}`, message)
      .then(date => date.json())
      .catch(err => console.log(err))

    this.setState({
      containers: containers
    })
  }

  handleCdKey= e => {
    this.setState({
      cdKey: e.target.id
    })
  }

  handleModifyCdName= e => {
    this.setState({
      cd_modify: e.target.value
    })
  }

  handleAddCdName= e => {
    this.setState({
      cd_add: e.target.value
    })
  }

  handleChangeBtn= e => {
    this.state.addCtBtn ? this.setState({addCtBtn: false}) : this.setState({addCtBtn:true})
  }

  handleAddCtName= e => {
    this.setState({
      ct_add: e.target.value
    })
  }

  handleUpdateCtName= e => {
    this.setState({
      ct_modify:e.target.value
    })
  }

  appKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.updateCard();
    }
  }

  updateContainer = async e => {
    if(this.state.ct_modify === ""){
      alert("수정 사항을 입력해 주세요!!👻")
      return 
    }

    let message = {
      method: "PUT",
      body: JSON.stringify({"ct_name":this.state.ct_modify}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }
    
    await fetch(`http://127.0.0.1:8080/containers/${e.target.id}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
 
    this.callContainer();
    this.setState({
      ct_modify: ""
    })
  }

  deleteContainer= async e => {
    let ct_key = e.target.id
    let message = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }
    
    await fetch(`http://127.0.0.1:8080/containers/${ct_key}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))

    this.callContainer();
  }

  updateCard = async () => {
    if(this.state.cd_modify === ""){
      alert("수정 사항을 입력해 주세요!!👻")
      return 
    }

    let message = {
      method: "PUT",
      body: JSON.stringify({"cd_name":this.state.cd_modify}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }
    
    await fetch(`http://127.0.0.1:8080/cards/${this.state.cdKey}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))

    this.callContainer();
    this.setState({
      cdKey: "",
      cd_modify: ""
    })
  }

  addCard= async e => {
    if(this.state.cd_add === ""){
      alert("내용을 입력해 주세요!!👻")
      return 
    }
    let ct_key = e.target.id
    
    let message = {
      method: "POST",
      body: JSON.stringify({"cd_name":this.state.cd_add, "ct_key":ct_key}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }
    
    await fetch(`http://127.0.0.1:8080/cards`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
    
    this.setState({
      cd_add:""
    })
    this.callContainer();
  }

  deleteCard= async e => {
    let cd_key = e.target.id
    let message = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
      }
    
    await fetch(`http://127.0.0.1:8080/cards/${cd_key}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))

    this.callContainer();
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Signout/>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Boards
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        {this.state.containers.map((con, index) => 
        <Button color='light' className='border-light' key={con.ct_key} cardVal={con.cards}>
          <UncontrolledDropdown >
            <DropdownToggle caret color="white">
              {con.ct_name}
            </DropdownToggle>
            <DropdownMenu>
              <Input onChange={this.handleUpdateCtName}/>
              <DropdownItem id={con.ct_key} onClick={this.updateContainer}>수정</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem id={con.ct_key} onClick={this.deleteContainer}>삭제</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <ListGroup key={index}>
          {con.cards.map((card, index)=> 
            <InputGroup key={index}>
              <Input style={{border: "0px", backgroundColor: "", margin:"2px", fontWeight: "bold"}}
                id={card.cd_key} 
                key={card.cd_key} 
                placeholder={card.cd_name}
                type="textarea"
                onClick={this.handleCdKey} 
                onChange={this.handleModifyCdName}
                onKeyPress={this.appKeyPress}
              />              
              <InputGroupAddon addonType="append">
                <Button color="white" id={card.cd_key} onClick={this.deleteCard}>x</Button>
              </InputGroupAddon>
            </InputGroup>
            )}
              {
                <InputGroup>
                <Input type="textarea" placeholder="something to do?" onChange={this.handleAddCdName}/>
                <InputGroupAddon addonType="append">
                  <Button color="success" onClick={this.addCard} id={con.ct_key}>add</Button>
                </InputGroupAddon>
              </InputGroup>
              }
          </ListGroup>
        </Button>)}
        {this.state.addCtBtn ? (<AddContainer b_key = {this.props.match.params.id} 
                                              ct_add = {this.state.ct_add} 
                                              ct_modify = {this.state.ct_modify} 
                                              click = {this.handleChangeBtn}
                                              change= {this.handleAddCtName}
                                              callBoard= {this.callBoard}/>) 
                                : (<Button onClick={this.handleChangeBtn}>+ Add another list</Button>)}
      </div>
    )
  }
}
