import React from "react";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [
        { name: "complete", done: true},
        { name: "react", done: true },
        { name: "project", done: true},
      ],
    };
  }
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };
  submitValue = () => {
    if (this.state.inputValue !== "") {
      console.log("submited");
      this.setState({
        todoList: [
          { name: this.state.inputValue, done: false },
          ...this.state.todoList,
        ],
      });
    } else {
      console.log("todo empty");
    }
  };
  deleteTodo = (index) => {

    this.setState({
      todoList: this.state.todoList.splice(index),
    });
    console.log(index);
  };

  clearCompleted = () =>{
    const filteredArray =  this.state.todoList.filter(todo => todo.done !== true )
    console.log(filteredArray);
    this.setState({todoList: filteredArray})
  }

  render() {
    const itemsLength = this.state.todoList.length
    return (
      <div className="App">
        <div className="heading">todo's...</div>
        <div>
          <input
            className="inputcheck"
            placeholder="what needs  to be done?"
            value={this.state.input}
            onChange={(event) => this.handleChange(event)}
          />
          <button onClick={this.submitValue}>Enter</button>
        </div>
        <div className="list-items ">
          {this.state.todoList.map((todoList, index) => (
            <div className="delete">
              <div className="checkbox">
                <input type="checkbox" id="check" checked={todoList.done} />
                <label htmlFor="check"> {todoList.name} </label>
              </div>
              <div className="destroy" onClick={() => this.deleteTodo(index)}>x</div>
            </div>
          ))}
          <div>
          <div className="footer-buttons">{itemsLength} items left </div>
            <button className="footer-buttons">All</button>
            <button className="footer-buttons">Active</button>
            <button className="footer-buttons">completed</button>
            <button className="footer-buttons" onClick ={this.clearCompleted} >clear completed</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
