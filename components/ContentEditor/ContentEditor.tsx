import { useCallback, useState } from "react";
import Input from "~/components/Input";
import MarkdownEditor from "~/components/MarkdownEditor";
import { Content, ContentType } from "~/types";

export interface ContentEditorProps {
  type: ContentType;
  content?: Content;
  onSubmit: (formValues: {
    type: ContentType;
    body: string;
    title: string;
  }) => Promise<void>;
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
    async (body: string) => {
      await onSubmit({ type, body, title });
    },
    [onSubmit, title, type],
  );

  return (
    <>
      <div className="mb-2">
        <Input
          label="Title"
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
          hasError={title.length > 200}
          errorMessage={
            title.length > 200 ? "Title should be less than 200 characters." : undefined
          }
        />
      </div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
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
