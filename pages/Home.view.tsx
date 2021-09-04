import ContributionStatus, {
  ContributionStatusProps,
} from "~/components/ContributionStatus";
import Footer from "~/components/Footer";
import MonCard from "~/components/MonCard";
import MonRankingTableContainer from "~/components/MonRankingTable";
import PaintingCardContainer from "~/components/PaintingCard";
import PokeBallStatus from "~/components/PokeBallStatus";
import UserRankingTableContainer from "~/components/UserRankingTable";
import { convertMonToCardMon, convertMonToModalMon } from "~/helpers/projectHelpers";
import { Mon, Painting } from "~/types";

export interface HomeProps extends ContributionStatusProps {
  newMons?: Mon[];
  newPaintings?: Painting[];
}

const Home: React.FC<HomeProps> = ({
  availableContributions,
  lastPayback,
  user,
  newMons,
  newPaintings,
}) => {
  return (
    <>
      <div className="content-container max-w-screen-xl m-auto p-1 sm:p-4 flex flex-col">
        <div className={`grid grid-cols-1 gap-4 xl:grid-cols-${!!user ? 2 : 1} mt-4`}>
          <ContributionStatus
            availableContributions={availableContributions}
            lastPayback={lastPayback}
            user={user}
          />
          {user && user.__pokeBall__ && <PokeBallStatus pokeBall={user.__pokeBall__} />}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-4">
          <UserRankingTableContainer isPreview type="collection" />
          <UserRankingTableContainer isPreview type="contributions" />
        </div>
        <div className="mt-4">
          <MonRankingTableContainer isPreview />
        </div>
        <div className={`grid grid-cols-1 gap-4 xl:grid-cols-${!!user ? 2 : 1} mt-4`}>
          <div className="flex">
            {newMons?.map((mon) => (
              <MonCard
                key={mon.id}
                mon={convertMonToCardMon(mon)}
                customSize="w-1/3"
                modalMon={convertMonToModalMon(mon)}
              />
            ))}
          </div>
          <div className="flex">
            {newPaintings?.map((painting) => (
              <PaintingCardContainer
                key={painting.id}
                painting={painting}
                customSize="w-1/3"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
