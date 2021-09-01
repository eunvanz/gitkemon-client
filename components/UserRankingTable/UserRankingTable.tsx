import { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Table from "~/components/Table";
import { User } from "~/types";
import Intersection from "../Intersection";
import Loading from "../Loading";
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
}

const UserRankingTable: React.FC<UserRankingTableProps> = ({
  users,
  hasNextPage,
  onFetchNextPage,
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
    return [
      {
        title: "rank",
        dataIndex: "rank",
      },
      {
        title: "user",
        dataIndex: "nickname",
        render: (data) => <UserItem user={data} />,
      },
      {
        title: "collection point",
        dataIndex: "colPoint",
        render: (data) => data.colPoint.toLocaleString(),
      },
      {
        title: "contributions",
        dataIndex: "lastContributions",
        render: (data) => data.lastContributions.toLocaleString(),
      },
      {
        title: "trainer class",
        dataIndex: "trainerClass",
        render: (data) => <TrainerClassBadge trainerClass={data.trainerClass} />,
      },
      {
        title: "last payback",
        dataIndex: "lastPaybackDate",
        render: (data) => dayjs(data.lastPaybackDate).fromNow(),
      },
    ];
  }, []);

  return users ? (
    <>
      <Table dataSource={dataSource} columns={columns} />
      {hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
    </>
  ) : (
    <div className="h-60">
      <Loading isFullHeight />
    </div>
  );
};

export default UserRankingTable;
