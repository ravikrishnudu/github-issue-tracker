import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Issues.module.css";
import Labels from "./Labels";

async function getIssues(page) {
  return fetch(
    `https://api.github.com/ravikrishnudu/git/react/issues?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

function Issue({ issue }) {
  // console.log(issue);
  return (
    <div className={styles.issueContainer}>
      <div className={styles.issue}>
        <div className={styles.titleContent}>
          <span>
            <Link className={styles.title} to={`/issues/${issue.number}`}>
              {issue.title}
            </Link>
          </span>
          <Labels labels={issue.labels} />
        </div>
        <div className={styles.subTextBody}>
          <span className={styles.subText}>#{issue.number}</span>
          <span className={styles.subText}>
            opened {formatDistance(Date.now(), parseISO(issue.updated_at))} ago
          </span>
          <span className={styles.userLogin}>
            by{" "}
            <a href="/#" className={styles.herfUserTag}>
              {issue.user.login}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Issues() {
  const [issues, setIssues] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    getIssues(page).then((issues) => {
      setIssues(issues);
    });
  }, [page]);

  if (!issues) {
    return <div>Lodaing...</div>;
  }
  // console.log(issues);
  console.log(page);
  // eslint-disable-next-line
  // console.log(process.env.REACT_APP_TOKEN);
  return (
    <div>
      {issues.map((issue) => (
        <Issue issue={issue} key={issue.id} />
      ))}

      <div className={styles.buttonContainer}>
        <button
          className={styles.previousButton}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        {pages.map((page, index) => (
          <button
            className={styles.numberButtons}
            onClick={() => setPage(page)}
            key={index}
          >
            {page}
          </button>
        ))}
        <button className={styles.nextButton} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
