import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Issue.module.css";
import Labels from "./Labels";
import CommentContainer from "./CommentContainer";
import Markdown from "./Markdown";
// import Comments from "./Comments";
// import { useParams } from "react-router-dom";

async function getIssue(issueNumber) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues/${issueNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

async function getComments(issueNumber) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues/${issueNumber}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

function Title({ issue: { title, number, user, updated_at, comments } }) {
  return (
    <div>
      <div className={styles.titleBody}>
        <div className={styles.titleBar}>
          <span className={styles.issueTitle}>{title}</span>
          <span className={styles.issueNum}># {number} </span>
        </div>
        <div>
          <button className={styles.issueButton}>New issue</button>
        </div>
      </div>
      <div className={styles.issueTitleDetails}>
        <button className={styles.openButton}>Open</button>
        <div className={styles.userDetails}>
          <span className={styles.issueUserLogin}>{user.login}</span>
          <span className={styles.issueOpendTime}>
            opened this issue {formatDistance(Date.now(), parseISO(updated_at))}{" "}
            ago
          </span>
          <span className={styles.issueComments}>{comments} comments</span>
        </div>
      </div>
    </div>
  );
}
// class DiscussionBar extends Component {
//   render() {
//     const { issue } = this.props;
//     return (
//       <div className={styles.elementContainer}>
//         <div className={styles.elementTitle}>Assignees {issue.assignees}</div>
//         <span className={styles.elementChild}>No one assigned</span>
//       </div>
//     );
//   }
// }
class IssueDetails extends Component {
  render() {
    const { issue } = this.props;
    return (
      <div className={styles.rightContainer}>
        {/* <div> */}
        {/* <DiscussionBar issue={issue} /> */}
        <div className={styles.elementContainer}>
          <div className={styles.elementTitle}>Assignees {issue.assignees}</div>
          <span className={styles.elementChild}>No one assigned</span>
        </div>
        <div className={styles.elementContainer}>
          <div className={styles.elementTitle}>Labels</div>
          <Labels labels={issue.labels} />
        </div>
        <div className={styles.elementContainer}>
          <div className={styles.elementTitle}>Projects</div>
          <span className={styles.elementChild}>None yet</span>
        </div>
        <div className={styles.elementContainer}>
          <div className={styles.elementTitle}>Milestone</div>
          <span className={styles.elementChild}>None Milestone</span>
        </div>
        <div className={styles.elementContainer}>
          <div className={styles.elementTitle}>Linked pull requests</div>
          <p className={styles.elementChild}>
            Sucessfully merging a pull request may close this issue
          </p>
          <span className={styles.elementChild}>None yet</span>
        </div>
        <div className={styles.elementContainer}>
          <div className={styles.childElements}>
            <span className={styles.elementTitle}> Notifications</span>
            <span className={styles.elementChild}>Customize</span>
          </div>
          <button className={styles.subButton}>Subscribe</button>
          <p className={styles.elementChild}>
            You’re not receiving notifications from this thread.
          </p>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

class Comment extends Component {
  render() {
    const { comment } = this.props;
    const { body, updated_at, user } = comment;
    return (
      <div className={styles.comments}>
        <img
          className={styles.userImage}
          src={comment.user.avatar_url}
          alt="user profile logo"
        />
        <div className={styles.leftArrow}>
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
      </div>
    );
  }
}
class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      comments: [],
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    getIssue(id).then((issue) => {
      this.setState({ issue });
    });
    getComments(id).then((comments) => {
      this.setState({ comments });
    });
  }

  render() {
    const { issue, comments } = this.state;
    console.log(this.state);
    if (Object.entries(issue).length === 0) {
      return <div>Loading....</div>;
    }

    // const id = this.props.match.params.id;
    return (
      <div className={styles.mainContainer}>
        <div>
          <Title issue={issue} />
          <div className={styles.bodyContainer}>
            <img
              className={styles.userImage}
              src={issue.user.avatar_url}
              alt="user profile logo"
            />
            <div className={styles.leftArrow}>
              <CommentContainer issue={issue} />
            </div>
            <IssueDetails issue={issue} />
          </div>
        </div>
        <div>
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Issue;
