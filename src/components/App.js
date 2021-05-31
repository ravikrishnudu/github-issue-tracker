import React from "react";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.container}>
          Please follow the following Routes to navigate pages by adding above
          mentioned names to the end of the URl
          <div className={styles.container}>
            {" "}
            Example: https://ravi-tacker-ravikrishnudu.vercel.app/ravikrishnudu
          </div>
        </div>
        <div className={styles.container}>
          /username --(your github username) this takes to you to your github
          Profile and shows your Repositories
        </div>
        <div className={styles.container}>
          /issues/new --to create a new Issue
        </div>
        <div>
          /issues --navigate to issues page and clickon any issue this will
          navigate you that issue
        </div>
      </div>
    </div>
  );
}

export default App;
