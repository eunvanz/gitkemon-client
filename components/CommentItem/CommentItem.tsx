import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Comment, Content, User } from "~/types";
import Button from "../Button";
import MarkdownViewer from "../MarkdownViewer";
import Typography from "../Typography";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

export interface CommentItemProps {
  comment: Comment<Content>;
  user?: User;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, user }) => {
  return (
    <div className="flex flex-col">
      <UserItem
        user={comment.user}
        suffix={
          <Typography color="hint"> · {dayjs(comment.updatedAt).fromNow()}</Typography>
        }
      />
      <div className="mt-2 ml-4 pt-1 pl-4 border-l-2 border-gray-200">
        <MarkdownViewer text={comment.body} />
        {user && user.id === comment.userId && (
          <div className="mt-2">
            <Button color="white" size="xs" className="mr-2">
              Edit
            </Button>
            <Button color="white" size="xs">
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
