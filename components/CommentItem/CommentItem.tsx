import { useCallback, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Comment, Content, User } from "~/types";
import Button from "../Button";
import CommentEditor from "../CommentEditor";
import Dialog from "../Dialog";
import MarkdownViewer from "../MarkdownViewer";
import Typography from "../Typography";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

export interface CommentItemProps {
  comment: Comment<Content>;
  user?: User;
  onSubmitComment: VoidFunction;
  isSubmitting: boolean;
  onDeleteComment: VoidFunction;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  user,
  onSubmitComment,
  isSubmitting,
  onDeleteComment,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOnDeleteComment = useCallback(async () => {
    const isConfirmed = await Dialog.confirm({
      content: "Are your sure to delete?",
    });
    if (isConfirmed) {
      onDeleteComment();
    }
  }, [onDeleteComment]);

  return (
    <div className="flex flex-col my-2">
      <UserItem
        user={comment.user}
        suffix={
          <Typography color="hint"> · {dayjs(comment.updatedAt).fromNow()}</Typography>
        }
      />
      <div className="mt-2 ml-4 pt-1 pl-4 border-l-2 border-gray-200">
        {isEditMode ? (
          <CommentEditor
            comment={comment}
            onCancel={() => setIsEditMode(false)}
            onSubmit={onSubmitComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <MarkdownViewer text={comment.body} />
        )}
        {!isEditMode && user && user.id === comment.userId && (
          <div className="mt-2">
            <Button
              color="white"
              size="xs"
              className="mr-2"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
            <Button color="white" size="xs" onClick={handleOnDeleteComment}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
