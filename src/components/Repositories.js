import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Repositories.module.css";

async function getRepos() {
  return fetch(
    "https://api.github.com/users" + window.location.pathname + "/repos"
  ).then((res) => res.json());
}

function Repository({ repo, isRepo: { id } }) {
  console.log(id);
  return (
    <>
      <div className={styles.repoContainer}>
        <div className={styles.repoBody}>
          <Link className={styles.repoName}>{repo.name}</Link>
          <div className={styles.repoDescription}>{repo.description}</div>
          <div className={styles.repodetails}>
            {/* <span>{repo.forks_}</span> */}
            <span>{repo.license?.name}</span>
            <span>
              Updated {formatDistance(Date.now(), parseISO(repo.updated_at))}{" "}
              ago
            </span>
          </div>
        </div>
        <div>{repo.fork}</div>
      </div>
    </>
  );
}

export default function Repositories() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getRepos().then((repos) => {
      setRepos(repos);
    });
  }, []);

  return (
    <div>
      {repos.map((repo) => (
        <Repository repo={repo} isRepo={{ id: 1 }} key={repo.id} />
      ))}
    </div>
  );
}
