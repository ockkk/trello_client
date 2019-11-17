import React from 'react'
import {Input, InputGroup, Button, Card} from 'reactstrap'

export default function addCtBtn(props) {
  
  let addContainer= async () => {
    if(props.ct_add === ""){ 
      alert("내용을 입력해 주세요!!😑")  
      return
    }

    let message = {
      method: "POST",
      body: JSON.stringify({"ct_name":props.ct_add, "b_key":props.b_key}),
      headers: {
        "Content-type": "application/json", 
        token: sessionStorage.getItem("token")}
    }

    await fetch("http://54.180.144.153:8080/containers", message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))

    props.click()
    props.callContainer()
  }
  return (
    <div style={{height: "50%"}}>
      <Card style={{margin: "8px", padding: "5px", height:"30%"}}>
      <Input onChange={props.change} type="textarea" style={{resize: "none", marginBottom:"2px", height:"100%"}}/>
      <InputGroup style={{position:"relative" , float: "right"}}>
        <Button onClick={addContainer} color="primary">Add list</Button>
        <Button onClick={props.click} color="light">X</Button>
      </InputGroup>
      </Card>
    </div>
  )
}

