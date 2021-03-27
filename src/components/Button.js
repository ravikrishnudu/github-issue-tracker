import styles from "./Button.module.css";

export default function Button(props) {
  const { children, disabled, type, onClick } = props;
  return (
    <button
      className={disabled ? styles.submitButton : styles.disabledButton}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
