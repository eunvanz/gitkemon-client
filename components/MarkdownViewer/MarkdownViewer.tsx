import mdParser from "~/helpers/mdParser";

export interface MarkdownViewerProps {
  text: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ text }) => {
  return (
    <div
      className="custom-html-style"
      dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
    ></div>
  );
};

export default MarkdownViewer;
