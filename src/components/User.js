import React, { Component } from "react";

// import "./User.css";
import styles from "./User.module.css";

import Repositories from "./Repositories";

async function getUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) =>
    res.json()
  );
}

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    getUser(username).then((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    const username = this.props.match.params.username;
    if (user === undefined) {
      return <div>No data found</div>;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.leftContaainer}>
          <img
            className={styles.roundImg}
            src={user.avatar_url}
            alt="user profile img"
          />
          <div className={styles.username}>{user.name}</div>
          <div className={styles.login}>{user.login}</div>
          <div className={styles.bio}>{user.bio}</div>
          <div className={styles.multiButton}>
            <button className={styles.unfollowButton}>Unfollow</button>
            <button className={styles.samallBtn}>...</button>
          </div>
          <div className={styles.follownames}>
            <span>{user.followers} followers</span>
            <span className={styles.follownamesSub}>
              {user.following} following
            </span>
          </div>
          <div className={styles.details}>
            <div>{user.location}</div>
            <div>{user.email}</div>
            <div>{user.blog}</div>
            <div>{user.twitter_username}</div>
          </div>
          <div className={styles.HighlightsPart}>
            <h4>Highlights</h4>
            <h6>Arctic Code Vault Contributor</h6>
          </div>
        </div>
        <Repositories username={username} />
      </div>
    );
  }
}
