import React, { Component } from "react";
import Repositories from "./Repositories";
import "./User.css";

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
    const username = this.props.match.paramas;
    getUser(username).then((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;

    if (user === undefined) {
      return <div>No data found</div>;
    }

    console.log(user);

    return (
      <div className="main-container">
        <div className="left-contaainer">
          <img className="round-img" src={user.avatar_url} />
          <div className="username">{user.name}</div>
          <div className="login">{user.login}</div>
          <div className="bio">{user.bio}</div>
          <div className="multi-button">
            <button className="unfollow-button">Unfollow</button>
            <button className="samall-btn">...</button>
          </div>
          <div className="follownames">
            <span>{user.followers} followers</span>
            <span className="follownames-sub">{user.following} following</span>
          </div>
          <div className="details">
            <div>{user.location}</div>
            <div>{user.email}</div>
            <div>{user.blog}</div>
            <div>{user.twitter_username}</div>
          </div>
          <div className="Highlights-part">
            <h4>Highlights</h4>
            <h7>Arctic Code Vault Contributor</h7>
          </div>
        </div>
        <Repositories />
      </div>
    );
  }
}
