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
    const id = this.props.match.params.id;
    return (
      <div className="main-container">
        <div>
          <div>
            <div>
              <span className="issue-title">{issue.title}</span>
              <span className="issue-num"># {issue.number} </span>
              <spn>
                <button className="issue-button">New issue</button>
              </spn>
            </div>
            <div>
              <button className="open-button">Open</button>
              <span>{issue.user?.login}</span>
              {/* <div>
            openedthis issue{" "}
            {formatDistance(Date.now(), parseISO(1615472077557))} ago
            </div> */}
              <span>{issue.comments} comments</span>
            </div>
          </div>
          <div className="body-container">
            <div className="left-cont">{issue.body}</div>
            <div className="right-cont">
              <div>
                <div>
                  <div>Assignees {issue.assignees}</div>
                  <div>No one assigned</div>
                </div>
                <div>
                  Labels
                  {/* {issue.labels.map((label) => (
              <span style={{ backgroundColor: `#${label.color}` }}>
                {label.name}
              </span>
              ))} */}
                </div>
                <div>
                  <div>Projects</div>
                  <div>None yet</div>
                </div>
                <div>
                  <div>Milestone</div>
                  <div>None Milestone</div>
                </div>
                <div>
                  <div>Linked pull requests</div>
                  <div>
                    Sucessfully merging a pull request may close this issue
                  </div>
                  <div>None yet</div>
                </div>
              </div>
              <div>
                <span>Notifications</span>
                <span>Customize</span>
                <button>Subscribe</button>
                <div>You’re not receiving notifications from this thread.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Issue;
