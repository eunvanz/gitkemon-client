import { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import Table from "~/components/Table";
import ROUTES from "~/paths";
import { Content } from "~/types";
import Intersection from "../Intersection";
import { Column } from "../Table/Table";
import Typography from "../Typography";
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
  const router = useRouter();

  const dataSource: Content[] = useMemo(() => {
    return contents
      ? contents.map((content) => ({
          ...content,
          key: content.id,
        }))
      : [];
  }, [contents]);

  const columns: Column<Content>[] = useMemo(() => {
    const result: Column<Content>[] = [];
    if (!isPreview) {
      result.push({
        title: "id",
        dataIndex: "id",
      });
    }
    result.push(
      {
        title: "title",
        dataIndex: "title",
        render: (data) => (
          <Typography
            as="a"
            weight="bold"
            onClick={() => router.push(`${ROUTES.CONTENTS}/${data.type}/${data.id}`)}
          >
            {data.title}
          </Typography>
        ),
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
      title: "posted at",
      dataIndex: "createdAt",
      render: (data) => dayjs(data.createdAt).fromNow(),
    });
    return result;
  }, [isPreview, router]);

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
