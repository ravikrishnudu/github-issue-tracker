import React, { useState } from "react";
import cx from "classnames";

import styles from "./BodyComposer.module.css";

export default function BodyComposer({ body, handleChangeBody, handleSubmit }) {
  const [preview, setPreview] = useState(false);

  const handleKeyDown = (e) => {
    console.log(e);
    if (e.ctrlKey && e.code === "Enter" && handleSubmit) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.commentTabNav}>
        <div className={styles.TabNavTabs}>
          <button
            className={cx(
              preview ? styles.inactiveButton : styles.activeButton,
              styles.button
            )}
            onClick={() => setPreview(false)}
            type="button"
          >
            Write
          </button>
          <button
            className={cx(
              preview ? styles.activeButton : styles.inactiveButton,
              styles.button
            )}
            onClick={() => setPreview(true)}
            type="button"
          >
            Preview
          </button>
        </div>
        <div className={styles.markDownSymbols}>
          <button className={styles.markDownSymbolH}>H</button>
          <button className={styles.markDownSymbolB}>
            <strong>B</strong>
          </button>
          <button className={styles.markDownSymbolI}>
            <em>I</em>
          </button>
        </div>
      </div>
      <div className={styles.writeContent}>
        {preview ? (
          <div className={styles.commentTextarea}>
            {body ? body : "Nothing to preview"}
          </div>
        ) : (
          <textarea
            placeholder="Leave a comment"
            className={styles.commentTextarea}
            value={body}
            onChange={handleChangeBody}
            onKeyDown={handleKeyDown}
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
      Currently, I'm looking for a job I did have work experienceYes, I'm
      looking for a full-time job opportunity I start work immediately Hourly
      rate: 300 INRCountry: India, timezone: IST (GMT + 5:30)I'm Flexible with
      work TimingsFrontend developer: ReactJs, JavaScript,HTML, CSShad knowledge
      on backend: NodeJs ExpressJs  yesWhat is your total work experience? How
      much of that is relevant to this job?Are you available for full-time work
      (40 hrs/week)? If not, how many hours are you available?   How soon can
      you start?What is your hourly rate in your local currency?Which country
      and timezone are you in?Are you flexible with work timings? If not, what
      is your preferred work time?What are your primary skill sets?Do you
      authorize me to represent you to our prospective clients and share your
      profile with them? 
    </div>
  );
}
