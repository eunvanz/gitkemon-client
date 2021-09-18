import { Comment, Content } from "~/types";
import MarkdownEditor from "../MarkdownEditor";

export interface CommentEditorProps {
  comment?: Comment<Content>;
  isSubmitting: boolean;
  onCancel?: VoidFunction;
  onSubmit: (value: string) => void;
  isCancelHidden?: boolean;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
  comment,
  isSubmitting,
  onCancel,
  onSubmit,
  isCancelHidden,
}) => {
  return (
    <MarkdownEditor
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      onSubmit={onSubmit}
      defaultValue={comment?.body}
      height={200}
      isCancelHidden={isCancelHidden}
    />
  );
};

export default CommentEditor;
