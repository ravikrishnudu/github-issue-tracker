import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./app.css";

class Footer extends React.Component {
  render() {
    console.log("Footer Render");
    const { clearCompleted, completed, incompleteCount } = this.props;

    return (
      <div>
        <button className="footer-buttons">
          {incompleteCount} items left{" "}
        </button>
        <button className="footer-buttons">All</button>
        <button className="footer-buttons">Active</button>
        <button className="footer-buttons" onClick={completed}>
          completed
        </button>
        <button className="footer-buttons" onClick={clearCompleted}>
          clear completed
        </button>
      </div>
    );
  }
}

class Todo extends React.PureComponent {
  render() {
    console.log("Todo Render");
    const { todo, handleCheck, deleteTodo } = this.props;
    const { done, id, name } = todo;
    return (
      <div className="delete">
        <div className="checkbox">
          <input
            type="checkbox"
            id="check"
            checked={done}
            onChange={() => handleCheck(id)}
          />
          <label htmlFor="check-label"> {name} </label>
        </div>
        <div className="destroy" onClick={() => deleteTodo(id)}>
          x
        </div>
      </div>
    );
  }
}

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
      filter: "All",
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  submitValue = () => {
    const { inputValue, todoList } = this.state;
    if (inputValue !== "") {
      console.log("submited");
      this.setState({
        todoList: [
          { name: inputValue, done: false, id: uuidv4() },
          ...todoList,
        ],
      });
    } else {
      console.log("todo empty");
    }
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const filterArray = todoList.filter((todo) => todo.id !== id);
    this.setState({
      todoList: filterArray,
    });
    console.log(id, filterArray);
  };

  clearCompleted = () => {
    const { todoList } = this.state;

    const filteredArray = todoList.filter((todo) => todo.done !== true);
    console.log(todoList);
    this.setState({ todoList: filteredArray });
  };

  handleCheck = (id) => {
    const { todoList } = this.state;

    console.log(id);
    const newArray = todoList.map((todo) => {
      console.log(todo);
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      } else {
        return todo;
      }
    });
    this.setState({ todoList: newArray });
  };

  render() {
    const { todoList, inputValue } = this.state;
    let incompleteCount = todoList.filter((todo) => todo.done === false).length;

    return (
      <div className="App">
        <div className="heading">todo's...</div>
        <div>
          <input
            className="inputcheck"
            placeholder="what needs  to be done?"
            value={inputValue}
            onChange={(event) => this.handleChange(event)}
          />
          <button className="submitValuebutton" onClick={this.submitValue}>
            Enter
          </button>
        </div>
        <div className="list-items ">
          {todoList.map((todo, index) => (
            <Todo
              todo={todo}
              handleCheck={this.handleCheck}
              deleteTodo={this.deleteTodo}
              key={todo.id}
            />
          ))}
          <Footer
            clearCompleted={this.clearCompleted}
            completed={this.completed}
            incompleteCount={incompleteCount}
          />
        </div>
      </div>
    );
  }
}

export default App;
