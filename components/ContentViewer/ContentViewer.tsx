import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Content } from "~/types";
import Likes from "../Likes";
import MarkdownViewer from "../MarkdownViewer";
import Typography from "../Typography";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

export interface ContentViewerProps {
  content: Content;
  onClickLike: VoidFunction;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ content, onClickLike }) => {
  return (
    <>
      <Typography as="h1" size="2xl" weight="bold">
        {content.title}
      </Typography>
      <Typography as="p" color="hint">
        {content.createdAt === content.updatedAt ? "Posted" : "Updated"} by{" "}
        <UserItem isInline user={content.user} /> {dayjs(content.createdAt).fromNow()} ·{" "}
        {content.viewsCnt} views · {content.likesCnt} likes · {content.commentsCnt}{" "}
        comments
      </Typography>
      <div>
        <MarkdownViewer text={content.body} />
      </div>
      <Typography className="flex items-center" color="hint" as="p">
        <Likes
          className="inline-block ml-2"
          size="sm"
          likesCnt={content.likesCnt}
          isLiked={content.isLiked}
          onClick={onClickLike}
        />{" "}
        {content.likesCnt === 0 ? "Be the first liker." : "users like this post."}
      </Typography>
    </>
  );
};

export default ContentViewer;
