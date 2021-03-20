import React, { Component } from "react";
import { LabelText } from "./Text";
import styles from "./Labels.module.css";

class Label extends Component {
  render() {
    const { label } = this.props;
    return (
      <LabelText
        className={styles.toolComponents}
        style={{ backgroundColor: `#${label.color}` }}
      >
        {label.name}
      </LabelText>
    );
  }
}

export default class Labels extends Component {
  render() {
    const { labels } = this.props;
    return (
      <>
        {labels.map((label) => (
          <Label key={label.id} label={label} />
        ))}
      </>
    );
  }
}
