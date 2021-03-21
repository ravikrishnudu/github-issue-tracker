import React, { Component } from "react";
import marked from "marked";
import "./Markdown.css";

export default class Markdown extends Component {
  render() {
    const { body } = this.props;
    // console.log(body);
    const html = marked(body);
    return (
      <>
        <div className="body" dangerouslySetInnerHTML={{ __html: html }} />
      </>
    );
  }
}
