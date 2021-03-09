import React, { Component } from "react";
import { formatDistance, parseISO } from "date-fns";
import "./Issues.css";

async function getIssues(page = 1) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

class IssuesRepository extends Component {
  render() {
    const { issue } = this.props;
    console.log(`${issue.title}`);
    return (
      <div className="issue-repo-container">
        <div className="main-text-body">
          <span className="title">{issue.title}</span>
          {issue.labels.map((label) => (
            <span
              className="tool-components"
              key={label.id}
              style={{ backgroundColor: `#${label.color}` }}
            >
              {label.name}
            </span>
          ))}
          {/* {issue.labels[0].name} */}

          <div className="sub-text-body">
            <span className="sub-text">#{issue.number}</span>
            <span className="sub-text">
              opened {formatDistance(Date.now(), parseISO(issue.updated_at))}{" "}
              ago
            </span>
            <span className="sub-text-user-login">
              by <a href="/#"> {issue.user.login}</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      page: 1,
    };
  }

  componentDidMount() {
    // console.log("mounted");
    getIssues(this.state.page).then((issues) => {
      this.setState({ issues });
    });
  }

  render() {
    // console.log("Render");
    console.log(this.state.issues);
    // eslint-disable-next-line
    console.log(process.env.REACT_APP_TOKEN);
    const { issues } = this.state;
    return (
      <div>
        {issues.map((issue) => (
          <IssuesRepository issue={issue} key={issue.id} />
        ))}

        {/* {issue.map((label) => (
          <IssuesRePository label={label} key={issue.id} />
        ))} */}
      </div>
    );
  }
}
