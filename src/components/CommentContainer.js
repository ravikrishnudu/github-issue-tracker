import React from "react";
import { formatDistance, parseISO } from "date-fns";

import Markdown from "./Markdown";
import "./Markdown.css";
import styles from "./CommentContainer.module.css";

export default function CommentContainer({ body, updated_at, user }) {
  // console.log(this.props);
  return (
    <div className={styles.commentContainer}>
      <img
        className={styles.userImage}
        src={user.avatar_url}
        alt="user profile logo"
      />
      <div className={styles.leftArrow}>
        <div className={styles.commentBody}>
          <div className={styles.issueCommentHead}>
            <div className={styles.userLogin}>{user.login} </div>
            <div>
              commented {formatDistance(Date.now(), parseISO(updated_at))} ago
            </div>
          </div>
          <div>
            <div className={styles.leftContainer}>
              <Markdown body={body} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
