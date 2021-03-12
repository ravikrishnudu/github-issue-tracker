import React, { Component } from "react";
import "./Repositories.css";
async function getRepos() {
  return fetch(
    "https://api.github.com/users" + window.location.pathname + "/repos"
  ).then((res) => res.json());
}

class Repository extends Component {
  render() {
    const { repo } = this.props;

    return (
      <div className="repo-container">
        <div className="repo-name">
          <a herf="/#">{repo.name}</a>
        </div>
        <div className="repo-description">{repo.description}</div>
        <div>{repo.fork}</div>
        {/* <div>{repo.full_name}</div> */}
        {/* <div>{repo.pushed_at}</div> */}
      </div>
    );
  }
}

export default class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] };
  }

  componentDidMount() {
    getRepos().then((repos) => {
      this.setState({ repos });
    });
  }

  render() {
    console.log(this.state.repos);
    const { repos } = this.state;
    return (
      <div>
        {repos.map((repo) => (
          <Repository repo={repo} key={repo.id} />
        ))}
      </div>
    );
  }
}
