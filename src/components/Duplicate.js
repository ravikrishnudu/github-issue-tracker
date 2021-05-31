//user.js
import React, { Component } from "react";

import Repositories from "./Repositories";
import styles from "./User.module.css";

async function getUser(username) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/users/${username}`
  ).then((res) => res.json());
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
    if (user === undefined || !Repositories) {
      return <div>No data found</div>;
    }

    return (
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
    );
  }
}

// Repositories.js

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { formatDistance, parseISO } from "date-fns";
// import styles from "./Repositories.module.css";

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

//issues.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Issues.module.css";
import Labels from "./Labels";

async function getIssues(page) {
  return fetch(
    `https://api.github.com/repos/ravikrishnudu/git/issues?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

class Issue extends Component {
  render() {
    const { issue } = this.props;
    // console.log(issue);
    return (
      <div className={styles.issueContainer}>
        <div className={styles.issue}>
          <div className={styles.titleContent}>
            <span>
              <Link className={styles.title} to={`/issues/${issue.number}`}>
                {issue.title}
              </Link>
            </span>
            <Labels labels={issue.labels} />
          </div>
          <div className={styles.subTextBody}>
            <span className={styles.subText}>#{issue.number}</span>
            <span className={styles.subText}>
              opened {formatDistance(Date.now(), parseISO(issue.updated_at))}{" "}
              ago
            </span>
            <span className={styles.userLogin}>
              by{" "}
              <a href="/#" className={styles.herfUserTag}>
                {issue.user.login}
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: null,
      page: 1,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  componentDidMount() {
    getIssues(this.state.page).then((issues) => {
      this.setState({ issues });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (page !== prevState.page) {
      getIssues(this.state.page).then((issues) => {
        this.setState({ issues });
      });
    }
  }

  handlePreviousPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  };

  handleNextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  handlePage = (currentPage) => {
    this.setState({ page: currentPage });
  };

  render() {
    const { issues, pages } = this.state;
    if (!issues) {
      return <div>Lodaing...</div>;
    }
    console.log(this.state.issues);
    // eslint-disable-next-line
    // console.log(process.env.REACT_APP_TOKEN);
    return (
      <div>
        {issues.map((issue) => (
          <Issue issue={issue} key={issue.id} />
        ))}

        <div className={styles.buttonContainer}>
          <button
            className={styles.previousButton}
            onClick={this.handlePreviousPage}
          >
            Previous
          </button>
          {pages.map((page, index) => (
            <button
              className={styles.numberButtons}
              onClick={() => this.handlePage(page)}
              key={index}
            >
              {page}
            </button>
          ))}
          <button className={styles.nextButton} onClick={this.handleNextPage}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

//issue.js
import React, { Component } from "react";
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

async function getLabels() {
  return fetch(`https://api.github.com/repos/ravikrishnudu/git/labels`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
  }).then((res) => res.json());
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

class DiscussionSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: null,
    };
  }
  componentDidMount() {
    getLabels().then((labels) => {
      this.setState({ labels });
    });
  }
  render() {
    const { issue } = this.props;

    // console.log(labels);
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
}

class NewComment extends Component {
  render() {
    const {
      body,
      handleChangeBody,
      handleSubmit,
      closeIssue,
      issue,
    } = this.props;
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
}

class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: null,
      comments: null,
      body: "",
    };
  }

  fetchComments = () => {
    const number = this.props.match.params.number;
    getComments(number).then((comments) => {
      this.setState({ comments, body: " " });
    });
  };
  fetchIssue = () => {
    const number = this.props.match.params.number;
    getIssue(number).then((issue) => {
      this.setState({ issue });
    });
  };

  componentDidMount() {
    this.fetchIssue();
    this.fetchComments();
  }

  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { body, issue } = this.state;
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
        this.fetchComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  closeIssue = () => {
    const { issue } = this.state;
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
      // .then((response) => response.json())
      .then((data) => {
        this.fetchIssue();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    // const number = this.props.match.params.number;
    const { issue, comments, body } = this.state;
    if (!issue || !comments) {
      return <div>Loading....</div>;
    }
    console.log(comments);
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
                  fetchComments={this.fetchComments}
                />
              ))}
            </div>
            <div className={styles.newComment}>
              <NewComment
                body={body}
                issue={issue}
                issueNumber={issue.number}
                handleChangeBody={this.handleChangeBody}
                handleSubmit={this.handleSubmit}
                closeIssue={this.closeIssue}
              />
            </div>
          </div>
          <DiscussionSideBar issue={issue} />
        </div>
      </div>
    );
  }
}

export default Issue;

// NewIssue.js

// import React, { Component } from "react";
// import styles from "./NewIssue.module.css";
import BodyComposer from "./BodyComposer";
import Button from "./Button";

export default class NewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, body } = this.state;
    console.log(title, body);
    const issue = {
      owner: "ravikrishnudu",
      repo: "git",
      title: title,
      body: body,
    };

    fetch("https://api.github.com/repos/ravikrishnudu/git/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(issue),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { title, body } = this.state;
    // console.log(title, "title", body);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
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
                <div className={styles.inputSurrounding}>
                  <input
                    className={styles.titleInput}
                    placeholder="Title"
                    value={title}
                    onChange={(event) => this.handleChange(event)}
                  />
                </div>
                <BodyComposer
                  body={body}
                  handleChangeBody={this.handleChangeBody}
                />
                <div className={styles.markdownButton}>
                  <span className={styles.markdownText}>
                    Styling with Markdown is supported
                  </span>
                  <Button disabled={title === ""}>Submit new issue</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}
//BodyCompouser.js
import React, { Component } from "react";
import cx from "classnames";

import styles from "./BodyComposer.module.css";

export default class BodyComposer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
    };
  }

  handleKeyDown = (e) => {
    console.log(e);
    if (e.ctrlKey && e.code === "Enter" && this.props.handleSubmit) {
      this.props.handleSubmit(e);
    }
  };

  handlePreview = () => {
    this.setState({ preview: true });
  };

  handleWrite = () => {
    this.setState({ preview: false });
  };
  render() {
    const { preview } = this.state;
    const { body, handleChangeBody } = this.props;
    // console.log(this.props);
    return (
      <div className={styles.tabContainer}>
        <div className={styles.commentTabNav}>
          <div className={styles.TabNavTabs}>
            <button
              className={cx(
                preview ? styles.inactiveButton : styles.activeButton,
                styles.button
              )}
              onClick={this.handleWrite}
              type="button"
            >
              Write
            </button>
            <button
              className={cx(
                preview ? styles.activeButton : styles.inactiveButton,
                styles.button
              )}
              onClick={this.handlePreview}
              type="button"
            >
              Preview
            </button>
          </div>
          <div className={styles.markDownSymbols}>
            <button className={styles.markDownSymbolH}>H</button>
            <button className={styles.markDownSymbolB}>
              <strong>B</strong>
            </button>
            <button className={styles.markDownSymbolI}>
              <em>I</em>
            </button>
          </div>
        </div>
        <div className={styles.writeContent}>
          {preview ? (
            <div className={styles.commentTextarea}>
              {body ? body : "Nothing to preview"}
            </div>
          ) : (
            <textarea
              placeholder="Leave a comment"
              className={styles.commentTextarea}
              value={body}
              onChange={handleChangeBody}
              onKeyDown={this.handleKeyDown}
            />
          )}

          {preview ? null : (
            <div className={styles.dragAndDropText}>
              <span className={styles.dragText}>
                Attach files by draging & dropping, selecting or pasting them.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

//commentontainer.js

import React, { useState, useEffect } from "react";
import { formatDistance, parseISO } from "date-fns";
import { Listbox, ListboxOption } from "@reach/listbox";
import "@reach/listbox/styles.css";

import BodyComposer from "./BodyComposer";
import Button from "./Button";
import Markdown from "./Markdown";
import "./Markdown.css";
import styles from "./CommentContainer.module.css";

function updateComment(id, data) {
  return fetch(
    `https://api.github.com/repos/ravikrishnudu/git/issues/comments/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(data),
    }
  );
}

function updateIssue(number, issueData) {
  return fetch(
    `https://api.github.com/repos/ravikrishnudu/git/issues/${number}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(issueData),
    }
  );
}
export default class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { editComment: false, body: props.body };
  }
  handleDelete = () => {
    const { id, fetchComments } = this.props;
    const deleteComment = {
      owner: "ravikrishnudu",
      repo: "git",
      comment_id: id,
    };

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(deleteComment),
    };

    fetch(
      `https://api.github.com/repos/ravikrishnudu/git/issues/comments/${id}`,
      options
    )
      .then((data) => {
        console.log("Succes:", data);
        fetchComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  handleEdit = () => {
    this.setState({ editComment: true });
  };
  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { body } = this.state;
    const { id, fetchComments, type, number } = this.props;
    const data = {
      body: body,
    };
    if (type === "issue") {
      const issueData = {
        body: body,
      };
      updateIssue(number, issueData)
        .then((data) => {
          this.closeBodyComposer();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateComment(id, data)
        .then((data) => {
          this.closeBodyComposer();
          console.log("Success:", data);
          setTimeout(() => {
            fetchComments();
          }, 30 * 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  closeBodyComposer = () => {
    this.setState({ editComment: false });
  };
  render() {
    const { editComment, body } = this.state;
    const { updated_at, user, type } = this.props;

    return (
      <div className={styles.commentContainer}>
        <img
          className={styles.userImage}
          src={user.avatar_url}
          alt="user profile logo"
        />
        {!editComment ? (
          <>
            <div className={styles.leftArrow}>
              <div className={styles.commentBody}>
                <div className={styles.issueCommentHead}>
                  <div className={styles.issueCommentDetails}>
                    <div className={styles.userLogin}>{user.login} </div>
                    <div>
                      commented{" "}
                      {formatDistance(Date.now(), parseISO(updated_at))} ago
                    </div>
                  </div>
                  <div className={styles.listBox}>
                    {/* <button onClick={this.handleEdit}>Edit</button> */}
                    {/* <button onClick={this.handleDelete}>delete</button> */}

                    <Listbox defaultValue="ravi">
                      <ListboxOption value="ravi">....</ListboxOption>
                      <ListboxOption
                        className={styles.listBoxOption}
                        value="edit"
                        onClick={this.handleEdit}
                      >
                        Edit
                      </ListboxOption>
                      <ListboxOption
                        className={styles.listBoxOption}
                        value="hide"
                      >
                        Hide
                      </ListboxOption>
                      {type === "comment" ? (
                        <ListboxOption
                          onClick={this.handleDelete}
                          className={styles.listBoxOption}
                          value="delete"
                        >
                          Delete
                        </ListboxOption>
                      ) : null}
                    </Listbox>
                  </div>
                </div>

                <div>
                  <div className={styles.leftContainer}>
                    <Markdown body={body} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className={styles.commentBody}>
              <BodyComposer
                // handleSubmit={handleSubmit}
                body={body}
                // body={this.props.body}
                handleChangeBody={this.handleChangeBody}
              />
              <div className={styles.BodyComposerButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={this.closeBodyComposer}
                >
                  Cancel
                </button>
                <Button>Update Commment</Button>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}
// todos
import React from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./app.module.css";

class Footer extends React.Component {
  render() {
    console.log("Footer Render");
    const { clearCompleted, completed, incompleteCount } = this.props;

    return (
      <div>
        <button className={styles.footerButtons}>
          {incompleteCount} items left{" "}
        </button>
        <button className={styles.footerButtons}>All</button>
        <button className={styles.footerButtons}>Active</button>
        <button className={styles.footerButtons} onClick={completed}>
          completed
        </button>
        <button className={styles.footerButtons} onClick={clearCompleted}>
          clear completed
        </button>
      </div>
    );
  }
}

class Todo extends React.PureComponent {
  render() {
    console.log("Todo Render");
    const { todo, handleCheck, deleteTodo } = this.props;
    const { done, id, name } = todo;
    return (
      <div className={styles.delete}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="check"
            checked={done}
            onChange={() => handleCheck(id)}
          />
          <label htmlFor="check-label"> {name} </label>
        </div>
        <div className={styles.destroy} onClick={() => deleteTodo(id)}>
          x
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [
        { id: 1, name: "complete", done: true },
        { id: 2, name: "react", done: true },
        { id: 3, name: "project", done: true },
      ],
      filter: "All",
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  submitValue = () => {
    const { inputValue, todoList } = this.state;
    if (inputValue !== "") {
      console.log("submited");
      this.setState({
        todoList: [
          { name: inputValue, done: false, id: uuidv4() },
          ...todoList,
        ],
      });
    } else {
      console.log("todo empty");
    }
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const filterArray = todoList.filter((todo) => todo.id !== id);
    this.setState({
      todoList: filterArray,
    });
    console.log(id, filterArray);
  };

  clearCompleted = () => {
    const { todoList } = this.state;

    const filteredArray = todoList.filter((todo) => todo.done !== true);
    console.log(todoList);
    this.setState({ todoList: filteredArray });
  };

  handleCheck = (id) => {
    const { todoList } = this.state;

    console.log(id);
    const newArray = todoList.map((todo) => {
      console.log(todo);
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      } else {
        return todo;
      }
    });
    this.setState({ todoList: newArray });
  };

  render() {
    const { todoList, inputValue } = this.state;
    let incompleteCount = todoList.filter((todo) => todo.done === false).length;

    return (
      <div className={styles.App}>
        <div className={styles.heading}>todo's...</div>
        <div>
          <input
            className={styles.inputCheck}
            placeholder="what needs  to be done?"
            value={inputValue}
            onChange={(event) => this.handleChange(event)}
          />
          <button
            className={styles.submitValueButton}
            onClick={this.submitValue}
          >
            Enter
          </button>
        </div>
        <div className={styles.listItems}>
          {todoList.map((todo, index) => (
            <Todo
              todo={todo}
              handleCheck={this.handleCheck}
              deleteTodo={this.deleteTodo}
              key={todo.id}
            />
          ))}
          <Footer
            clearCompleted={this.clearCompleted}
            completed={this.completed}
            incompleteCount={incompleteCount}
          />
        </div>
      </div>
    );
  }
}