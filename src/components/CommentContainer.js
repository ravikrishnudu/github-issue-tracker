import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";

import Markdown from "./Markdown";
import "./Markdown.css";
import styles from "./Issue.module.css";

export default class CommentContainer extends Component {
  render() {
    const { issue } = this.props;
    const { body, updated_at, user } = issue;
    return (
      <div>
        {/* <img
          className={styles.userImage}
          src={issue.user.avatar_url}
          alt="user profile logo"
        />
        <div className={styles.leftArrow}> */}
        <div className={styles.issueCommentHead}>
          <div className={styles.issueUserLogin}>{user.login}</div>
          <div className={styles.issueOpendTime}>
            commented {formatDistance(Date.now(), parseISO(updated_at))} ago
          </div>
        </div>
        <div>
          <div className={styles.leftContainer}>
            <Markdown body={body} />
          </div>
        </div>
      </div>
      // </div>s
    );
  }
}
