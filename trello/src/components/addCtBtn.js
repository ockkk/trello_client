import React from 'react'
import {Input, InputGroup, Button} from 'reactstrap'

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

    await fetch("http://127.0.0.1:8080/containers", message)
      .then(date => date.json())
      .then(res => alert(res.message))
      .catch(err => console.log(err))
    props.click()
    props.callBoard()
  }
  return (
    <div>
      <Input onChange={props.change}/>
      <InputGroup>
      <Button onClick={addContainer}>Add list</Button>
      <Button onClick={props.click}>X</Button>
      </InputGroup>
    </div>
  )
}

