import ContributionStatus, {
  ContributionStatusProps,
} from "~/components/ContributionStatus";
import MonRankingTableContainer from "~/components/MonRankingTable";
import UserRankingTableContainer from "~/components/UserRankingTable";

export interface HomeProps extends ContributionStatusProps {}

const Home: React.FC<HomeProps> = ({ availableContributions, lastPayback, user }) => {
  return (
    <div className="content-container max-w-screen-xl m-auto p-1 sm:p-4 flex flex-col">
      <div className={`grid grid-cols-1 gap-4 xl:grid-cols-${!!user ? 2 : 1} mt-4`}>
        <ContributionStatus
          availableContributions={availableContributions}
          lastPayback={lastPayback}
          user={user}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-4">
        <UserRankingTableContainer isPreview type="collection" />
        <UserRankingTableContainer isPreview type="contributions" />
      </div>
      <div className="mt-4">
        <MonRankingTableContainer isPreview />
      </div>
    </div>
  );
};

export default Home;
