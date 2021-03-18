import React, { Component } from "react";
import styles from "./NewIssue.module.css";
// import { formatDistance, parseISO } from "date-fns";
// import styles from "./Issue.module.css";
// import Markdown from "./Markdown";
// import { useParams } from "react-router-dom";

// async function getComments(issueNumber) {
//   return fetch(
//     `https://api.github.com/repos/facebook/react/issues/${issueNumber}/comments`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
//       },
//     }
//   ).then((res) => res.json());
// }

// class Comment extends Component {
//   render() {
//     const { comment } = this.props;
//     const { updated_at, user } = comment;
//     return (
//       <div className={styles.comments}>
//         <img
//           className={styles.userImage}
//           src={comment.user.avatar_url}
//           alt="user profile logo"
//         />
//         <div className={styles.leftArrow}>
//           <div className={styles.issueCommentHead}>
//             <div className={styles.issueUserLogin}>{user.login}</div>
//             <div className={styles.issueOpendTime}>
//               commented {formatDistance(Date.now(), parseISO(updated_at))} ago
//             </div>
//           </div>
//           <div>
//             <div className={styles.leftContainer}>
//               {/* <Markdown body={body} /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default class NewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   comments: [],
    };
  }
  //   componentDidMount() {
  //     const id = this.props.match.params.id;
  //     getComments(id).then((comments) => {
  //       this.setState({ comments });
  //     });
  //   }
  render() {
    // const { comments } = this.state;
    return (
      <div className={styles.commentWrapper}>
        <div>
          <img
            className={styles.avatarUrl}
            alt="profile -img"
            src="https://avatars.githubusercontent.com/u/52109411?s=80&v=4"
          />
        </div>
        <div className={styles.leftArrow}>
          <div className={styles.commentBox}>
            <div className={styles.inputSurrounding}>
              <input className={styles.titleInput} placeholder="Title" />
            </div>
            <div className={styles.tabContainer}>
              <div className={styles.commentTabNav}>
                <div className={styles.TabNavTabs}>
                  <button type="button" className={styles.writeButton}>
                    Write
                  </button>
                  <button type="button" className={styles.prevButton}>
                    Preview
                  </button>
                </div>
              </div>
              <div className={styles.writeContent}>
                <textarea className={styles.commentTextarea}>
                  Leave a comment
                </textarea>
                <div className={styles.dragAndDropText}>
                  <span className={styles.dragText}>
                    Attach files by draging & dropping, selecting or pasting
                    them.
                  </span>
                </div>
              </div>
              <div className={styles.markdownButton}>
                <span className={styles.markdownText}>
                  Styling with Markdown is supported
                </span>
                <button className={styles.newIssuebtn}>Submit new issue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
