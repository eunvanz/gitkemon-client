import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt();

export interface MarkdownViewerProps {
  text: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}></div>;
};

export default MarkdownViewer;
