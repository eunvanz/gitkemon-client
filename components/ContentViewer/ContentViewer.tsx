import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Content, Comment, User } from "~/types";
import Button from "../Button";
import CommentEditor from "../CommentEditor";
import CommentList, { CommentListProps } from "../CommentList";
import Likes from "../Likes";
import MarkdownViewer from "../MarkdownViewer";
import Typography from "../Typography";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

export interface ContentViewerProps
  extends Omit<CommentListProps, "isSubmittingComment"> {
  content: Content;
  onClickLike: (content: Content) => void;
  onSubmitComment: (value: string, comment?: Comment<Content>) => Promise<void>;
  isSubmittingNewComment: boolean;
  user?: User;
  isSubmittingExistingComment: boolean;
  onDeleteContent: (content: Content) => void;
  onEditContent: (content: Content) => void;
  isDeletingContent: boolean;
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  onClickLike,
  onSubmitComment,
  isSubmittingNewComment,
  user,
  comments,
  isSubmittingExistingComment,
  onDeleteComment,
  onDeleteContent,
  onEditContent,
  isDeletingContent,
}) => {
  return (
    <>
      <div className="border-b mb-4">
        <Typography as="h1" size="3xl" weight="bold">
          {content.title}
        </Typography>
        <Typography as="p" color="hint">
          Posted by <UserItem isInline user={content.user} />{" "}
          {dayjs(content.createdAt).fromNow()} · {content.viewsCnt} views ·{" "}
          {content.likesCnt} likes · {content.commentsCnt} comments
          {user && user.id === content.userId && (
            <>
              <Button
                color="white"
                size="xs"
                className="mx-2"
                onClick={() => onEditContent(content)}
                disabled={isDeletingContent}
              >
                Edit
              </Button>
              <Button
                color="white"
                size="xs"
                onClick={() => onDeleteContent(content)}
                isLoading={isDeletingContent}
              >
                Delete
              </Button>
            </>
          )}
        </Typography>
      </div>
      <div>
        <MarkdownViewer text={content.body} />
      </div>
      <div className="border-t my-4" />
      <Typography className="flex items-center" color="hint" as="p">
        <Likes
          className="mr-2"
          size="sm"
          likesCnt={content.likesCnt}
          isLiked={content.isLiked}
          onClick={() => onClickLike(content)}
        />{" "}
        {content.likesCnt === 0
          ? "Make the first like."
          : `${content.likesCnt} user${content.likesCnt > 1 ? "s" : ""} like${
              content.likesCnt > 1 ? "" : "s"
            } this post.`}
      </Typography>
      <CommentList
        comments={comments}
        user={user}
        isSubmittingComment={isSubmittingExistingComment}
        onDeleteComment={onDeleteComment}
        onSubmitComment={onSubmitComment}
      />
      {user && (
        <div className="mt-4">
          <Typography color="hint">
            Comment as <Typography weight="bold">{user.nickname}</Typography>
          </Typography>
          <CommentEditor
            onSubmit={onSubmitComment}
            isSubmitting={isSubmittingNewComment}
            isCancelHidden
          />
        </div>
      )}
    </>
  );
};

export default ContentViewer;
