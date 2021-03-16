import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Repositories.module.css";

async function getRepos() {
  return fetch(
    "https://api.github.com/users" + window.location.pathname + "/repos"
  ).then((res) => res.json());
}

class Repository extends Component {
  render() {
    const { repo } = this.props;

    return (
      <div className={styles.repoContainer}>
        <div className={styles.repoBody}>
          <Link className={styles.repoName}>{repo.name}</Link>
          <div className={styles.repoDescription}>{repo.description}</div>
          <div className={styles.repodetails}>
            {/* <span>{repo.forks_}</span> */}
            <span>{repo.license?.name}</span>
            <span>
              Updated {formatDistance(Date.now(), parseISO(repo.updated_at))}{" "}
              ago
            </span>
          </div>
        </div>
        <div>{repo.fork}</div>
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
