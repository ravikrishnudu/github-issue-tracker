import React from "react";
import marked from "marked";
import "./Markdown.css";

export default function Markdown({ body }) {
  const html = marked(body);
  return (
    <>
      <div className="body" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
