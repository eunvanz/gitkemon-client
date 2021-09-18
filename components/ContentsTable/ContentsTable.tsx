import { useMemo } from "@storybook/addons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Table from "~/components/Table";
import { Content } from "~/types";
import Intersection from "../Intersection";
import { Column } from "../Table/Table";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

export interface ContentsTableProps {
  contents?: Content[];
  isPreview?: boolean;
  hasNextPage?: boolean;
  onFetchNextPage?: VoidFunction;
}

const ContentsTable: React.FC<ContentsTableProps> = ({
  contents,
  isPreview,
  hasNextPage,
  onFetchNextPage,
}) => {
  const dataSource: Content[] = useMemo(() => {
    return contents
      ? contents.map((content, index) => ({
          ...content,
          key: content.id,
        }))
      : [];
  }, [contents]);

  const columns: Column<Content>[] = useMemo(() => {
    const result: Column<Content>[] = [];
    result.push(
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "title",
        dataIndex: "title",
      },
      {
        title: "author",
        dataIndex: "userId",
        render: (data) => <UserItem user={data.user} />,
      },
    );
    if (!isPreview) {
      result.push(
        {
          title: "views",
          dataIndex: "viewsCnt",
          render: (data) => data.viewsCnt.toLocaleString(),
        },
        {
          title: "likes",
          dataIndex: "likesCnt",
          render: (data) => data.likesCnt.toLocaleString(),
        },
        {
          title: "views",
          dataIndex: "commentsCnt",
          render: (data) => data.commentsCnt.toLocaleString(),
        },
      );
    }
    result.push({
      title: "updated",
      dataIndex: "updatedAt",
      render: (data) => dayjs(data.updatedAt).fromNow(),
    });
    return result;
  }, [isPreview]);

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        isLoading={!contents}
        skeletonLength={isPreview ? 3 : 10}
      />
      {!isPreview && hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
    </>
  );
};

export default ContentsTable;
