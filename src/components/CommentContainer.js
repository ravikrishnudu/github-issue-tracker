import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";

import Markdown from "./Markdown";
import "./Markdown.css";
import styles from "./Issue.module.css";

export default class CommentContainer extends Component {
  render() {
    const { issue } = this.props;
    return (
      <div>
        <div className={styles.issueCommentHead}>
          <div className={styles.issueUserLogin}>{issue.user.login}</div>
          <div className={styles.issueOpendTime}>
            commented {formatDistance(Date.now(), parseISO(issue.updated_at))}{" "}
            ago
          </div>
        </div>
        <div>
          <div className={styles.leftContainer}>
            <Markdown body={issue.body} />
          </div>
        </div>
      </div>
    );
  }
}
