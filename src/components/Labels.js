import React, { Component } from "react";
import { LabelText } from "./Text";
import styles from "./Labels.module.css";

function Label({ label }) {
  return (
    <LabelText
      className={styles.labels}
      style={{ backgroundColor: `#${label.color}` }}
    >
      {label.name}
    </LabelText>
  );
}

export default function Labels({ labels }) {
  return (
    <>
      {labels.map((label) => (
        <Label key={label.id} label={label} />
      ))}
    </>
  );
}
