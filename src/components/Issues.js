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
          ))}{" "}
          <div className="sub-text-body">
            <span className="sub-text">#{issue.number}</span>
            <span className="sub-text">
              opened {formatDistance(Date.now(), parseISO(issue.updated_at))}{" "}
              ago
            </span>
            <span className="sub-text-user-login">
              by{" "}
              <a href="/#" className="herf-user-tag">
                {" "}
                {issue.user.login}
              </a>
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
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  componentDidMount() {
    // console.log("mounted");
    getIssues(this.state.page).then((issues) => {
      this.setState({ issues });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    // console.log(prevState.page, page);
    if (page !== prevState.page) {
      getIssues(this.state.page).then((issues) => {
        this.setState({ issues });
      });
    }
  }

  handlePreviousPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
    // console.log(page);
  };

  handleNextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    // console.log(page);
  };

  handlePage = (currentPage) => {
    // const { page } = this.state;
    this.setState({ page: currentPage });
  };

  render() {
    // console.log("Render");
    console.log(this.state.issues);
    // eslint-disable-next-line
    // console.log(process.env.REACT_APP_TOKEN);
    const { issues, pages } = this.state;
    return (
      <div>
        {issues.map((issue) => (
          <IssuesRepository issue={issue} key={issue.id} />
        ))}
        <div className="button-container">
          <button className="previous-button" onClick={this.handlePreviousPage}>
            {" "}
            Previous{" "}
          </button>
          {pages.map((page, index) => (
            <button
              className="num-buttons"
              onClick={() => this.handlePage(page)}
              key={index}
            >
              {page} {}{" "}
            </button>
          ))}
          <button className="next-button" onClick={this.handleNextPage}>
            {" "}
            Next
          </button>
        </div>
      </div>
    );
  }
}
