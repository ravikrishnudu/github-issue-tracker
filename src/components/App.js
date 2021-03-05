import React from "react";
import "./app.css";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [
        { id: 1, name: "complete", done: true },
        { id: 2, name: "react", done: true },
        { id: 3, name: "project", done: true },
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
          { name: this.state.inputValue, done: false, id: uuidv4() },
          ...this.state.todoList,
        ],
      });
    } else {
      console.log("todo empty");
    }
  };
  deleteTodo = (id) => {
    const filterArray = this.state.todoList.filter((todo) => todo.id !== id);
    this.setState({
      todoList: filterArray,
    });
    console.log(id, filterArray);
  };

  clearCompleted = () => {
    const filteredArray = this.state.todoList.filter(
      (todo) => todo.done !== true
    );
    console.log(filteredArray);
    this.setState({ todoList: filteredArray });
  };

  handlecheck = (id) => {
    console.log(id);
    const newArray = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      } else {
        return todo;
      }
    });
    this.setState({ todoList: newArray });
    // let checkedline = this.state.todoList[index]
    // console.log();
  };

  render() {
    const itemsLength = this.state.todoList.length;
    console.log(this.state.todoList);
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
            <div className="delete" key={todoList.id}>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="check"
                  checked={todoList.done}
                  onChange={() => this.handlecheck(todoList.id)}
                />
                <label htmlFor="check-label"> {todoList.name} </label>
              </div>
              <div
                className="destroy"
                onClick={() => this.deleteTodo(todoList.id)}
              >
                x
              </div>
            </div>
          ))}
          <div>
            <button className="footer-buttons">
              {itemsLength} items left{" "}
            </button>
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
