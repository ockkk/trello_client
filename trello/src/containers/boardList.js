import React, {Component} from 'react';
import Board from '../components/board'
import Signout from '../components/signout'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button } from 'reactstrap';

export default class boardList extends Component {
  state ={
    boards:[],
    selectBoard: ""
  }

  componentDidMount(){
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

  selectBoard = (e) =>{
    this.setState({
      selectBoard : e.target.key
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
          <Signout/>
          {
            this.state.boards.map(board => 
              <Link to = {`boards/${board.b_key}`}>
                <Button>{board.b_name}</Button>
              </Link>
            )
          }
          <Button color="warning" onClick={this.getBoards}>name</Button>
      </div>
    )
  }
}
