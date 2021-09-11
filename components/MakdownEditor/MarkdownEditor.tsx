import { useCallback, useState } from "react";
import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export interface MarkdownEditorProps {
  defaultValue: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ defaultValue = "" }) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleOnChange = useCallback(({ html, text }) => {
    setValue(text);
  }, []);

  return (
    <MdEditor
      value={value}
      onChange={handleOnChange}
      renderHTML={(text) => mdParser.render(text)}
    />
  );
};

export default MarkdownEditor;
