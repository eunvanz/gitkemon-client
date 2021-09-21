import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt("commonmark", {
  html: true,
  breaks: true,
  linkify: true,
});

export default mdParser;
