import React, { useState, useEffect } from "react";

import Repositories from "./Repositories";
import styles from "./User.module.css";

async function getUser(username) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/users/${username}`
  ).then((res) => res.json());
}

export default function User(props) {
  const [user, setUser] = useState(undefined);

  const username = props.match.params.username;
  useEffect(() => {
    getUser(username).then((user) => setUser(user));
  }, [username]);

  if (user === undefined || !Repositories) {
    return <div>No data found</div>;
  }
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.leftContaainer}>
          <img
            className={styles.roundImage}
            src={user.avatar_url}
            alt="user profile img"
          />
          <div className={styles.username}>{user.name}</div>
          <div className={styles.login}>{user.login}</div>
          <div>
            <button className={styles.unfollowButton}>Unfollow</button>
            <button className={styles.samallButton}>...</button>
          </div>
          <div className={styles.bio}>{user.bio}</div>
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
            <p>Arctic Code Vault Contributor</p>
          </div>
        </div>
        <Repositories username={username} />
      </div>
    </div>
  );
}
