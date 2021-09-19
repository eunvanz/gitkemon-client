import { useCallback, useState } from "react";
import Input from "~/components/Input";
import MarkdownEditor from "~/components/MarkdownEditor";
import { Content, ContentType } from "~/types";

export interface ContentEditorProps {
  type: ContentType;
  content?: Content;
  onSubmit: (formValues: { type: ContentType; body: string; title: string }) => void;
  isSubmitting: boolean;
  onCancel: VoidFunction;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  type,
  content,
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  const [title, setTitle] = useState<string>(content?.title || "");

  const handleOnSubmit = useCallback(
    (body: string) => {
      onSubmit({ type, body, title });
    },
    [onSubmit, title, type],
  );

  return (
    <>
      <div className="mb-2">
        {/* @ts-ignore */}
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <MarkdownEditor
        height={500}
        onSubmit={handleOnSubmit}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        defaultValue={content?.body}
      />
    </>
  );
};

export default ContentEditor;
