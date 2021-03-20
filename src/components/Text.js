import cx from "classnames";
import styles from "./Text.module.css";

export function H1({ children }) {
  return <span className={styles.h1}>{children}</span>;
}

export function LabelText({ children, className, ...props }) {
  return (
    <span className={cx(styles.label, className)} {...props}>
      {children}
    </span>
  );
}

export function ButtonText({ children }) {}

export function BodyText() {}
