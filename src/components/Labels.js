import React, { Component } from "react";
// import "./Issues.css";
import styles from "./Issues.module.css";

export default class Labels extends Component {
  render() {
    const { labels } = this.props;
    return (
      <div>
        {labels.map((label) => (
          <span
            className={styles.toolComponents}
            key={label.id}
            style={{ backgroundColor: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))}{" "}
      </div>
    );
  }
}
