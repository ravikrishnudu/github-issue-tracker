import React, { Component } from "react";

import styles from "./BodyComposer.module.css";

export default class BodyComposer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
    };
  }

  handlePreview = () => {
    this.setState({ preview: true });
  };

  handleWrite = () => {
    this.setState({ preview: false });
  };
  render() {
    const { preview } = this.state;
    const { body, handleChangeBody } = this.props;
    console.log(this.props);
    return (
      <div className={styles.tabContainer}>
        <div className={styles.commentTabNav}>
          <div className={styles.TabNavTabs}>
            <button
              type="button"
              className={styles.writeButton}
              onClick={this.handleWrite}
            >
              Write
            </button>
            <button
              type="button"
              className={styles.prevButton}
              onClick={this.handlePreview}
            >
              Preview
            </button>
          </div>
        </div>
        <div className={styles.writeContent}>
          {preview ? (
            <div className={styles.commentTextarea}>{body}</div>
          ) : (
            <textarea
              placeholder="Leave a comment"
              className={styles.commentTextarea}
              value={body}
              onChange={(event) => handleChangeBody(event)}
            />
          )}

          <div className={styles.dragAndDropText}>
            <span className={styles.dragText}>
              Attach files by draging & dropping, selecting or pasting them.
            </span>
          </div>
        </div>
      </div>
    );
  }
}
