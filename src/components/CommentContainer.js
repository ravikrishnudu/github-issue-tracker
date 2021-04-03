import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";
import { Listbox, ListboxOption } from "@reach/listbox";
import "@reach/listbox/styles.css";

import BodyComposer from "./BodyComposer";
import Markdown from "./Markdown";
import "./Markdown.css";
import styles from "./CommentContainer.module.css";

export default class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { editComment: false };
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
  handleEdit = () => {};
  render() {
    const { body, updated_at, user } = this.props;
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
              <div className={styles.issueCommentDetails}>
                <div className={styles.userLogin}>{user.login} </div>
                <div>
                  commented {formatDistance(Date.now(), parseISO(updated_at))}{" "}
                  ago
                </div>
              </div>
              <div className={styles.listBox}>
                <button onClick={this.handleEdit}>Edit</button>
                {/* <button onClick={this.handleDelete}>delete</button> */}

                <Listbox defaultValue="ravi">
                  <ListboxOption value="ravi">....</ListboxOption>
                  <ListboxOption className={styles.listBoxOption} value="edit">
                    Edit
                  </ListboxOption>
                  <ListboxOption className={styles.listBoxOption} value="hide">
                    Hide
                  </ListboxOption>
                  <ListboxOption
                    onClick={this.handleDelete}
                    className={styles.listBoxOption}
                    value="delete"
                  >
                    Delete
                  </ListboxOption>
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
      </div>
    );
  }
}
