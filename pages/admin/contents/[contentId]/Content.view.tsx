import { useCallback, useState } from "react";
import MarkdownEditor from "~/components/MarkdownEditor";
import Select from "~/components/Select";
import { ContentType } from "~/types";

export interface ContentProps {
  onSubmit: (type: ContentType, value: string) => void;
  isSubmitting: boolean;
  onCancel: VoidFunction;
  defaultValue?: string;
}

const Content: React.FC<ContentProps> = ({
  onSubmit,
  isSubmitting,
  onCancel,
  defaultValue,
}) => {
  const [type, setType] = useState<ContentType>("notice");

  const handleOnSubmit = useCallback(
    (value: string) => {
      onSubmit(type, value);
    },
    [onSubmit, type],
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
          onChange={setType}
          value={type}
        />
      </div>
      <MarkdownEditor
        height={500}
        onSubmit={handleOnSubmit}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Content;
