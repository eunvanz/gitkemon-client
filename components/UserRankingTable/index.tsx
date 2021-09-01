import UserRankingTable from "./UserRankingTable";
import useUserRankingTable from "./useUserRankingTable";

export interface UserRankingTableContainerProps {
  type: "collection" | "contributions";
}

const UserRankingTableContainer = ({ type }: UserRankingTableContainerProps) => {
  const props = useUserRankingTable({ type });

  return <UserRankingTable {...props} />;
};

export default UserRankingTableContainer;
