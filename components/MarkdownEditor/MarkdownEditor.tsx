import { useCallback, useState } from "react";
import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
import api from "~/api";
import { ExtendableHTMLProps } from "~/types";
import Button from "../Button";
import Dialog from "../Dialog";

const mdParser = new MarkdownIt();

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export interface MarkdownEditorProps
  extends Omit<ExtendableHTMLProps<HTMLDivElement>, "onSubmit"> {
  defaultValue?: string;
  height?: number;
  onSubmit: (value: string) => Promise<void>;
  isSubmitting: boolean;
  onCancel?: VoidFunction;
  isCancelHidden?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  defaultValue = "",
  height = 300,
  onSubmit,
  isSubmitting,
  onCancel,
  isCancelHidden,
  ...restProps
}) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleOnChange = useCallback(({ text }) => {
    setValue(text);
  }, []);

  const handleOnImageUpload = useCallback(async (file) => {
    const url = await api.uploadFile(file);
    return url;
  }, []);

  const handleOnCancel = useCallback(async () => {
    if (!value) {
      onCancel?.();
    } else {
      const isConfirmed = await Dialog.confirm({
        title: "Cancel",
        content: "Are you sure to cancel?",
      });
      if (isConfirmed) {
        onCancel?.();
      }
    }
  }, [onCancel, value]);

  const handleOnSubmit = useCallback(async () => {
    await onSubmit(value!);
    setValue("");
  }, [onSubmit, value]);

  return (
    <div {...restProps}>
      <MdEditor
        value={value}
        onChange={handleOnChange}
        renderHTML={(text) => mdParser.render(text)}
        onImageUpload={handleOnImageUpload}
        style={{ width: "100%", height }}
        config={{
          view: {
            md: true,
            menu: true,
            html: false,
          },
        }}
        readOnly={isSubmitting}
      />
      <div className="flex justify-end mt-2">
        {!isCancelHidden && (
          <Button
            color="white"
            className="mr-2"
            disabled={isSubmitting}
            onClick={handleOnCancel}
          >
            Cancel
          </Button>
        )}
        <Button onClick={handleOnSubmit} isLoading={isSubmitting} disabled={!value}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
