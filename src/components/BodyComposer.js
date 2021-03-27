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
              className={preview ? styles.inactiveButton : styles.writeButton}
              onClick={this.handleWrite}
              type="button"
            >
              Write
            </button>
            <button
              className={preview ? styles.prevButton : styles.inactiveButton}
              onClick={this.handlePreview}
              type="button"
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
