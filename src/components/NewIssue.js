import React, { useState } from "react";
import styles from "./NewIssue.module.css";
import BodyComposer from "./BodyComposer";
import Button from "./Button";
import { useHistory } from "react-router";

export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const issue = {
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
        history.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
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
              <div className={styles.inputSurrounding}>
                <input
                  className={styles.titleInput}
                  placeholder="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <BodyComposer
                body={body}
                handleChangeBody={(event) => setBody(event.target.value)}
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
