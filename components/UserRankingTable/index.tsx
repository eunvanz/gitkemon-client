import UserRankingTable from "./UserRankingTable";
import useUserRankingTable from "./useUserRankingTable";

export interface UserRankingTableContainerProps {
  type: "collection" | "contributions";
  isPreview?: boolean;
}

const UserRankingTableContainer = ({
  type,
  isPreview,
}: UserRankingTableContainerProps) => {
  const props = useUserRankingTable({ type, isPreview });

  return <UserRankingTable {...props} />;
};

export default UserRankingTableContainer;
