import React, { Component } from "react";
import styles from "./NewIssue.module.css";
import BodyComposer from "./BodyComposer";
import Text from "./Text";
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
