import React, { useState } from "react";
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
export default function CommentContainer({
  body,
  updated_at,
  user,
  type,
  id,
  fetchComments,
  number,
}) {
  const [editComment, setEditComment] = useState(false);
  const [commentBody, setCommentBody] = useState(() => body);
  console.log(commentBody);
  const handleDelete = () => {
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
        fetchComments(number);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      body: commentBody,
    };
    if (type === "issue") {
      const issueData = {
        body: commentBody,
      };
      updateIssue(number, issueData)
        .then((data) => {
          setEditComment(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateComment(id, data)
        .then((data) => {
          setEditComment(false);
          console.log("Success:", data);
          setTimeout(() => {
            fetchComments(number);
          }, 30 * 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
                    commented {formatDistance(Date.now(), parseISO(updated_at))}{" "}
                    ago
                  </div>
                </div>
                <div className={styles.listBox}>
                  <Listbox defaultValue="...">
                    <ListboxOption value="...">....</ListboxOption>
                    <ListboxOption
                      className={styles.listBoxOption}
                      value="edit"
                      onClick={() => setEditComment(true)}
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
                        onClick={handleDelete}
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
        <form onSubmit={handleSubmit}>
          <div className={styles.commentBody}>
            <BodyComposer
              body={commentBody}
              handleChangeBody={(event) => setCommentBody(event.target.value)}
            />
            <div className={styles.BodyComposerButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setEditComment(false)}
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
