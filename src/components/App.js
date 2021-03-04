import React from "react";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [
       {id:1, name: "complete", done: true },
        {id:2, name: "react", done: true },
        {id:3, name: "project", done: true },
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

  clearCompleted = () => {
    const filteredArray = this.state.todoList.filter(
      (todo) => todo.done !== true
    );
    console.log(filteredArray);
    this.setState({ todoList: filteredArray });
  };

  handlecheck = (index) =>{
    console.log(index);
    let checkedline = this.state.todoList[index]
    console.log(checkedline);
  }

  render() {
    const itemsLength = this.state.todoList.length;
    return (
      <div className="App">
        <div className="heading">todo's...</div>
        <div>
          <input
            className="inputcheck"
            placeholder="what needs  to be done?"
            value={this.state.inputValue}
            onChange={(event) => this.handleChange(event)}
          />
          <button onClick={this.submitValue}>Enter</button>
        </div>
        <div className="list-items ">
          {this.state.todoList.map((todoList, index) => (
            <div className="delete" key={todoList.id} > 
              <div className="checkbox">
                <input type="checkbox" id="check" checked={todoList.done} onClick ={() => this.handlecheck(index)} />
                <label htmlFor="check"> {todoList.name} </label>
              </div>
              <div className="destroy" onClick={() => this.deleteTodo(index)}>
                x
              </div>
            </div>
          ))}
          <div>
            <button className="footer-buttons">{itemsLength} items left </button>
            <button className="footer-buttons">All</button>
            <button className="footer-buttons">Active</button>
            <button className="footer-buttons">completed</button>
            <button className="footer-buttons" onClick={this.clearCompleted}>
              clear completed
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
