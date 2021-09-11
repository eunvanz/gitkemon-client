import { useCallback, useState } from "react";
import { Input } from "antd";
import MarkdownEditor from "~/components/MarkdownEditor";
import Select from "~/components/Select";
import { Content as ContentAsType, ContentType } from "~/types";

export interface ContentFormValues {
  type: ContentType;
  body: string;
  title: string;
}

export interface ContentProps {
  onSubmit: (formValues: { type: ContentType; body: string; title: string }) => void;
  isSubmitting: boolean;
  onCancel: VoidFunction;
  content?: ContentAsType;
  type: ContentType;
  onChangeType: (type: ContentType) => void;
}

const Content: React.FC<ContentProps> = ({
  onSubmit,
  isSubmitting,
  onCancel,
  content,
  type,
  onChangeType,
}) => {
  const [title, setTitle] = useState<string>(content?.title || "");

  const handleOnSubmit = useCallback(
    (body: string) => {
      onSubmit({ type, body, title });
    },
    [onSubmit, title, type],
  );

  return (
    <div className="content-container">
      <div className="mb-2">
        <Select
          label="Content type"
          items={[
            {
              value: "notice",
              displayValue: "Notice",
            },
          ]}
          onChange={onChangeType}
          value={type}
        />
      </div>
      <div className="mb-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <MarkdownEditor
        height={500}
        onSubmit={handleOnSubmit}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        defaultValue={content?.body}
      />
    </div>
  );
};

export default Content;
