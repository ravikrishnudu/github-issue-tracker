import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Issue.module.css";
import Labels from "./Labels";
import CommentContainer from "./CommentContainer";
import Markdown from "./Markdown";
import "./NewIssue.module.css";
// import Comments from "./Comments";
// import { useParams } from "react-router-dom";

async function getIssue(issueNumber) {
  return fetch(
    `https://api.github.com/repos/ravikrishnudu/git/issues/${issueNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

async function getComments(issueNumber) {
  return fetch(
    `https://api.github.com/repos/ravikrishnudu/git/issues/${issueNumber}/comments`,
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

class CommentDiscussion extends Component {
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

class NewCommment extends Component {
  render() {
    const { body, handleChangeBody, handleSubmit } = this.props;
    return (
      <div className={styles.comments}>
        {" "}
        <form onSubmit={handleSubmit}>
          <div className={styles.commentWrapper}>
            <div>
              <img
                className={styles.avatarUrl}
                alt="profile -img"
                src="https://avatars.githubusercontent.com/u/52109411?s=80&v=4"
              />
            </div>
            <div className={styles.leftArrow}>
              <div className={styles.commentBox}>
                <div className={styles.tabContainer}>
                  <div className={styles.commentTabNav}>
                    <div className={styles.TabNavTabs}>
                      <button type="button" className={styles.writeButton}>
                        Write
                      </button>
                      <button type="button" className={styles.prevButton}>
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className={styles.writeContent}>
                    <textarea
                      placeholder="Leave a comment"
                      className={styles.commentTextarea}
                      value={body}
                      onChange={(event) => handleChangeBody(event)}
                    />

                    <div className={styles.dragAndDropText}>
                      <span className={styles.dragText}>
                        Attach files by draging & dropping, selecting or pasting
                        them.
                      </span>
                    </div>
                  </div>
                  <div className={styles.markDownButton}>
                    <button className={styles.newIssuebtn} type="submit">
                      comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
      body: "",
      issueNumber: "",
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

  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { body, issueNumber } = this.state;
    console.log(body);
    const issue = {
      owner: "ravikrishnudu",
      repo: "git",
      issue_number: issueNumber,
      body: body,
    };
    fetch(
      `https://api.github.com/repos/ravikrishnudu/git/issues/${issueNumber}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        body: JSON.stringify(issue),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  render() {
    const { issue, comments, body, issueNumber } = this.state;
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
            <CommentDiscussion comment={comment} key={comment.id} />
          ))}
        </div>
        <div>
          <NewCommment
            body={body}
            issueNumber={issueNumber}
            handleChangeBody={this.handleChangeBody}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Issue;
