import { Comment, Content, User } from "~/types";
import CommentItem from "../CommentItem";

export interface CommentListProps {
  comments?: Comment<Content>[];
  user?: User;
  onSubmitComment: (value: string, comment: Comment<Content>) => void;
  onDeleteComment: (comment: Comment<Content>) => void;
  isSubmittingComment: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  user,
  onSubmitComment,
  isSubmittingComment,
  onDeleteComment,
}) => {
  return (
    <div>
      {comments
        ? comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              user={user}
              onSubmitComment={(value: string) => onSubmitComment(value, comment)}
              isSubmitting={isSubmittingComment}
              onDeleteComment={() => onDeleteComment(comment)}
            />
          ))
        : // TODO: skeleton
          null}
    </div>
  );
};

export default CommentList;
