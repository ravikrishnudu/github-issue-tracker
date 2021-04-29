import React, { useState, useEffect } from "react";
import { formatDistance, parseISO } from "date-fns";

import Labels from "./Labels";
import CommentContainer from "./CommentContainer";
import BodyComposer from "./BodyComposer";
import Button from "./Button";
import styles from "./Issue.module.css";
import newCommentstyles from "./NewIssue.module.css";

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

function IssueDetails({
  issue: { title, number, user, updated_at, comments, state },
}) {
  return (
    <div className={styles.issueDetails}>
      <div className={styles.titleBody}>
        <div className={styles.titleNameNumber}>
          <span className={styles.title}>{title} </span>
          <span className={styles.issueNumber}>#{number}</span>
        </div>
        <a href="/issues/new" className={styles.issueButton}>
          New issue
        </a>
      </div>
      <div className={styles.issueTitleDetails}>
        <div
          className={
            state !== "closed" ? styles.openButton : styles.closedIssueButton
          }
        >
          {state}
        </div>
        <div className={styles.userDetails}>
          <span className={styles.userLogin}>{user.login}</span>
          <span>
            opened this issue {formatDistance(Date.now(), parseISO(updated_at))}{" "}
            ago
          </span>
          <span> {comments} comments</span>
        </div>
      </div>
    </div>
  );
}

function DiscussionSideBar({ issue }) {
  return (
    <div className={styles.rightContainer}>
      <div className={styles.elementContainer}>
        <div className={styles.elementTitle}>Assignees</div>
        <div>
          {issue.assignees.length !== 0
            ? issue.assignees.map((assignee) => (
                <div className={styles.dataCard}>
                  <img
                    className={styles.avataruserImage}
                    src={assignee.avatar_url}
                    alt="user profile logo"
                  />
                  <div>{assignee.login}</div>
                </div>
              ))
            : "No one assigned"}
        </div>
      </div>
      <div className={styles.elementContainer}>
        <div className={styles.elementTitle}>Labels</div>

        <div className={styles.label}>
          <Labels labels={issue.labels} />
        </div>
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
    </div>
  );
}

function NewComment({
  body,
  handleChangeBody,
  handleSubmit,
  closeIssue,
  issue,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={newCommentstyles.commentWrapper}>
          <div>
            <img
              className={newCommentstyles.avatarUrl}
              alt="profile -img"
              src="https://avatars.githubusercontent.com/u/52109411?s=80&v=4"
            />
          </div>
          <div className={newCommentstyles.leftArrow}>
            <div className={newCommentstyles.commentBox}>
              <BodyComposer
                handleSubmit={handleSubmit}
                body={body}
                handleChangeBody={handleChangeBody}
              />
              <div className={styles.commentButtons}>
                <button
                  className={styles.closeButton}
                  type="button"
                  onClick={closeIssue}
                >
                  {issue.state === "open" ? "Close issue" : "Reopen issue"}
                </button>
                <Button disabled={body === ""}>Comment</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Issue(props) {
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState(null);
  const [body, setBody] = useState("");

  const fetchComments = () => {
    const number = props.match.params.number;
    getComments(number).then((comments) => {
      setComments(comments);
      setBody("");
    });
  };
  const fetchIssue = () => {
    const number = props.match.params.number;
    getIssue(number).then((issue) => {
      setIssue(issue);
    });
  };

  useEffect(() => {
    fetchIssue();
    fetchComments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const comment = {
      body: body,
    };

    fetch(
      `https://api.github.com/repos/ravikrishnudu/git/issues/${issue.number}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        body: JSON.stringify(comment),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const closeIssue = () => {
    const closedIssue = {
      state: issue.state !== "closed" ? "closed" : "open",
    };

    fetch(
      `https://api.github.com/repos/ravikrishnudu/git/issues/${issue.number}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        body: JSON.stringify(closedIssue),
      }
    )
      .then((data) => {
        fetchIssue();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!issue || !comments) {
    return <div>Loading....</div>;
  }
  return (
    <div className={styles.mainContainer}>
      <IssueDetails issue={issue} />
      <div className={styles.bodyContainer}>
        <div>
          <CommentContainer {...issue} type="issue" />

          <div className={styles.comments}>
            {comments.map((comment) => (
              <CommentContainer
                {...comment}
                type="comment"
                key={comment.id}
                issue={issue}
                fetchComments={fetchComments}
              />
            ))}
          </div>
          <div className={styles.newComment}>
            <NewComment
              body={body}
              issue={issue}
              issueNumber={issue.number}
              handleChangeBody={(event) => setBody(event.target.value)}
              handleSubmit={handleSubmit}
              closeIssue={closeIssue}
            />
          </div>
        </div>
        <DiscussionSideBar issue={issue} />
      </div>
    </div>
  );
}

export default Issue;
