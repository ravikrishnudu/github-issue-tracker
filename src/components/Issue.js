import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";
import "./Issue.css";

// import { useParams } from "react-router-dom";

async function getIssue(issueNumber) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues/${issueNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    getIssue(id).then((issue) => {
      this.setState({ issue });
    });
  }

  render() {
    const { issue } = this.state;
    console.log(this.state);
    if (Object.entries(issue).length === 0) {
      return <div>Loading....</div>;
    }
    // else {
    //   return <div>Loading....</div>;
    // }
    const id = this.props.match.params.id;
    return (
      <div className="main-container">
        <div>
          <div>
            <div className="title-body">
              <div className="title-bar">
                <span className="issue-title">{issue.title}</span>
                <span className="issue-num"># {issue.number} </span>
              </div>
              <div>
                <button className="issue-button">New issue</button>
              </div>
            </div>
            <div className="issue-title-details">
              <button className="open-button">Open</button>
              <div className="user-details">
                <span className="issue-user-login">{issue.user.login}</span>

                <span className="issue-opend-time">
                  opened this issue{" "}
                  {formatDistance(Date.now(), parseISO(issue.updated_at))} ago
                </span>
                <span className="issue-comments">
                  {issue.comments} comments
                </span>
              </div>
            </div>
          </div>
          <div className="body-container">
            <div className="left-container">{issue.body}</div>
            <div className="right-container">
              <div>
                <div className="element-container">
                  <div className="element-title">
                    Assignees {issue.assignees}
                  </div>
                  <span className="element-child">No one assigned</span>
                </div>
                <div className="element-container-1">
                  <div className="element-title">Labels</div>
                  {issue.labels.map((label) => (
                    <span
                      className="label-component"
                      style={{ backgroundColor: `#${label.color}` }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
                <div className="element-container-1">
                  <div className="element-title">Projects</div>
                  <span className="element-child">None yet</span>
                </div>
                <div className="element-container-1">
                  <div className="element-title">Milestone</div>
                  <span className="element-child">None Milestone</span>
                </div>
                <div className="element-container-1">
                  <div className="element-title">Linked pull requests</div>
                  <p className="element-child">
                    Sucessfully merging a pull request may close this issue
                  </p>
                  <span className="element-child">None yet</span>
                </div>
              </div>
              <div className="element-container-1">
                <div className="child-elements">
                  <span className="element-title"> Notifications</span>
                  <span className="element-child">Customize</span>
                </div>
                <button className="sub-button">Subscribe</button>
                <p className="element-child">
                  You’re not receiving notifications from this thread.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Issue;
