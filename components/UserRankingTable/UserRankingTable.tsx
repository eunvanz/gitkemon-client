import { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Table from "~/components/Table";
import { User } from "~/types";
import Intersection from "../Intersection";
import { Column } from "../Table/Table";
import TrainerClassBadge from "../TrainerClassBadge";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

interface RankingItem extends User {
  rank: number;
  key: string;
}

export interface UserRankingTableProps {
  users?: User[];
  hasNextPage?: boolean;
  onFetchNextPage?: VoidFunction;
  isPreview?: boolean;
  type?: "collection" | "contributions";
}

const UserRankingTable: React.FC<UserRankingTableProps> = ({
  users,
  hasNextPage,
  onFetchNextPage,
  isPreview,
  type,
}) => {
  const dataSource: RankingItem[] = useMemo(() => {
    return users
      ? users.map((user, index) => ({
          ...user,
          rank: index + 1,
          key: user.id,
        }))
      : [];
  }, [users]);

  const columns: Column<RankingItem>[] = useMemo(() => {
    const result: Column<RankingItem>[] = [];
    result.push(
      {
        title: "rank",
        dataIndex: "rank",
      },
      {
        title: "user",
        dataIndex: "nickname",
        render: (data) => <UserItem user={data} />,
      },
    );
    if (!isPreview || (isPreview && type === "collection")) {
      result.push({
        title: "c.p",
        dataIndex: "colPoint",
        render: (data) => data.colPoint.toLocaleString(),
      });
    }
    if (!isPreview || (isPreview && type === "contributions")) {
      result.push({
        title: "contributions",
        dataIndex: "lastContributions",
        render: (data) => data.lastContributions.toLocaleString(),
      });
    }
    result.push({
      title: "trainer class",
      dataIndex: "trainerClass",
      render: (data) => <TrainerClassBadge trainerClass={data.trainerClass} />,
    });
    if (!isPreview) {
      result.push({
        title: "last check-in",
        dataIndex: "lastPaybackDate",
        render: (data) => dayjs(data.lastPaybackDate).fromNow(),
      });
    }
    return result;
  }, [isPreview, type]);

  return (
    <>
      <Table
        dataSource={isPreview ? dataSource.slice(0, 3) : dataSource}
        columns={columns}
        isLoading={!users}
        skeletonLength={isPreview ? 3 : 10}
      />
      {!isPreview && hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
    </>
  );
};

export default UserRankingTable;
