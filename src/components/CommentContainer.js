import React from "react";
import { formatDistance, parseISO } from "date-fns";
import { Listbox, ListboxOption } from "@reach/listbox";
import "@reach/listbox/styles.css";

import Markdown from "./Markdown";
import "./Markdown.css";
import styles from "./CommentContainer.module.css";

export default function CommentContainer(props) {
  const { id, body, updated_at, user, fetchComments } = props;
  console.log(id);

  function handleDelete() {
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
      // .then((response) => response.json())
      .then((data) => {
        console.log("Succes:", data);
        fetchComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
                commented {formatDistance(Date.now(), parseISO(updated_at))} ago
              </div>
            </div>
            <div className={styles.listBox}>
              <button>Edit</button>
              <button onClick={handleDelete}>delete</button>

              <Listbox defaultValue="ravi">
                <ListboxOption value="ravi">....</ListboxOption>
                <ListboxOption className={styles.listBoxOption} value="edit">
                  Edit
                </ListboxOption>
                <ListboxOption className={styles.listBoxOption} value="hide">
                  Hide
                </ListboxOption>
                <ListboxOption className={styles.listBoxOption} value="delete">
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
