import React, { Component } from "react";
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
