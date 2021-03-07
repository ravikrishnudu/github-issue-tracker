import React, { Component } from "react";

async function getIssues(page = 1) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

export default class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      page: 1,
    };
  }

  componentDidMount() {
    console.log("mounted");
    getIssues(this.state.page).then((issues) => {
      this.setState({ issues });
    });
  }

  render() {
    console.log("Render");
    console.log(this.state.issues);
    // eslint-disable-next-line
    console.log(process.env.REACT_APP_TOKEN);

    return <div></div>;
  }
}
