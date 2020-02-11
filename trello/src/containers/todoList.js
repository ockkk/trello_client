import React, { Component } from 'react'
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button,  ListGroup, Input, InputGroupAddon, InputGroup, Card, CardTitle } from 'reactstrap';
import AddContainer from "../components/addCtBtn"
export default class todoList extends Component {
  constructor(props){
    super()
    this.state = {
      boards: [],
      containers: [],
      cdKey:"",
      moveCdKey:"",
      cd_add:"",
      cd_modify:"",
      ct_add:"",
      ct_modify:"",
      addCtBtn: false,

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
      
      let boards = await fetch("http://54.180.115.9:8080/boards", message)
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

    let containers = await fetch(`http://54.180.115.9:8080/boards/${this.props.match.params.id}`, message)
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

  handleMoveCdKey= e => {
    this.setState({
      moveCdKey: e.target.id
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
  
  handleClickCancleMove= e =>{
    console.log("취소실행!!")
    this.setState({
      moveCdKey: ""
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
    
    await fetch(`http://54.180.115.9:8080/containers/${e.target.id}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
 
    this.callContainer();
    this.setState({
      ct_modify: "",
      moveCdKey: ""
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
    
    await fetch(`http://54.180.115.9:8080/containers/${ct_key}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
    
    this.setState({
      moveCdKey: ""
    })
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
    
    await fetch(`http://54.180.115.9:8080/cards/${this.state.cdKey}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))

    this.callContainer();
    this.setState({
      cdKey: "",
      cd_modify: "",
      moveCdKey: ""
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
    
    await fetch(`http://54.180.115.9:8080/cards`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
    
    this.setState({
      cd_add:"",
      moveCdKey: ""
    })
    this.callContainer();
  }

  deleteCard= async e => {
    let cd_key = e.target.id
    let message = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")
      }
    }
    
    await fetch(`http://54.180.115.9:8080/cards/${cd_key}`, message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))

    this.setState({
      moveCdKey: ""
    })
    this.callContainer();
  }

  moveCard= async e => {
    let cd_key = this.state.moveCdKey
    let ct_key = e.target.id
    let message = {
      method: "PUT",
      body:JSON.stringify({"ct_key":ct_key}),
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token") 
      }
    }

    await fetch(`http://54.180.115.9:8080/cards/${cd_key}/move`, message)
      .then(date => date.json())
      .catch(err => console.log(err.toString()))

    this.callContainer();
    this.setState({
      moveCdKey: ""
    })
  }
  render() {
    return (
      <div style={{height:"100vh", background:"whitesmoke"}}>
         <Row style={{height:"100%"}}>
        {this.state.containers.map((con, index) => 
          <Col sm={2.5} key={index} style={{height: "100%", paddingRight:"0px", paddingLeft:"0px"}}>
            <Card body color='' id={con.ct_key} key={con.ct_key} style={{marginLeft: "7px", marginTop: "7px"}}>
              <div>
              <CardTitle style={{position: "relative", float: "left", fontWeight:"bold"}}>
                {con.ct_name}
              </CardTitle>
              <UncontrolledDropdown>
                <DropdownToggle caret color="" style={{position: "relative", float: "right"}}/>
                <DropdownMenu>
                  <Input onChange={this.handleUpdateCtName}/>
                  <DropdownItem id={con.ct_key} onClick={this.updateContainer}>수정</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem id={con.ct_key} onClick={this.deleteContainer}>삭제</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {this.state.moveCdKey &&  
              <Button id={con.ct_key} onClick={this.moveCard} style={{position: "relative", float: "right", backgroundColor:"white", border: "none"}}>
                🙂
              </Button>}
              </div>
              <ListGroup key={index}>
              {con.cards.map((card, index)=> 
                <InputGroup key={index} >
                  <Card color="" id={card.cd_key} style={{width: "100%", margin:"2px"}}>
                    <Input style={{border: "0px", fontWeight: "", resize:"none", height: "60px", color:"primary"}}
                      id={card.cd_key} 
                      key={card.cd_key} 
                      placeholder={card.cd_name}
                      type="textarea"
                      onClick={this.handleCdKey} 
                      onChange={this.handleModifyCdName}
                      onKeyPress={this.appKeyPress}
                    />              
                    <div>
                    <Button color="white" id={card.cd_key} onClick={this.deleteCard} style={{position: "relative", float: "right"}}>x</Button>
                    <Button color="white" id={card.cd_key} onClick={this.handleMoveCdKey} style={{position: "relative", float: "right"}}>move</Button>
                    </div>
                  </Card>
                </InputGroup>
                )}
                  {
                    <InputGroup style={{margin: "2px"}}>
                    <Input type="textarea" placeholder="something to do?" onChange={this.handleAddCdName} style={{marginRight:"1px", height:"60px", resize:"none"}}/>
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={this.addCard} id={con.ct_key}>add</Button>
                    </InputGroupAddon>
                  </InputGroup>
                  }
              </ListGroup>
            </Card>
           </Col>)}
          <Col sm={3}>
            {this.state.addCtBtn ? (<AddContainer b_key = {this.props.match.params.id} 
                                                  ct_add = {this.state.ct_add} 
                                                  ct_modify = {this.state.ct_modify} 
                                                  click = {this.handleChangeBtn}
                                                  change= {this.handleAddCtName}
                                                  callContainer= {this.callContainer}/>) 
                                    : (<Button onClick={this.handleChangeBtn} color="primary" style={{ marginTop: "7px", marginLeft: "-7px", width:"90%"}}>+ Add another list</Button>)}
          </Col>
        </Row>
      </div>
    )
  }
}
