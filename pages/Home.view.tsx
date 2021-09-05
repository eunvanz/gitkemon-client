import Button from "~/components/Button";
import ContributionStatus, {
  ContributionStatusProps,
} from "~/components/ContributionStatus";
import Footer from "~/components/Footer";
import MonCard from "~/components/MonCard";
import MonRankingTableContainer from "~/components/MonRankingTable";
import PaintingCardContainer from "~/components/PaintingCard";
import PokeBallStatus from "~/components/PokeBallStatus";
import Typography from "~/components/Typography";
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
        <div className={`grid grid-cols-1 gap-6 xl:grid-cols-${!!user ? 2 : 1}`}>
          <ContributionStatus
            availableContributions={availableContributions}
            lastPayback={lastPayback}
            user={user}
          />
          {user && user.__pokeBall__ && <PokeBallStatus pokeBall={user.__pokeBall__} />}
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-6">
          <div>
            <div className="flex items-center mb-3">
              <Typography weight="semibold" size="lg">
                Top 3 Collection Point
              </Typography>
              <Typography className="ml-3" as="a" size="sm">
                More
              </Typography>
            </div>
            <UserRankingTableContainer isPreview type="collection" />
          </div>
          <div>
            <div className="flex items-center mb-3">
              <Typography weight="semibold" size="lg">
                Top 3 Contributions
              </Typography>
              <Typography className="ml-3" as="a" size="sm">
                More
              </Typography>
            </div>
            <UserRankingTableContainer isPreview type="contributions" />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center mb-3">
            <Typography weight="semibold" size="lg">
              Top 3 Pokemons
            </Typography>
            <Typography className="ml-3" as="a" size="sm">
              More
            </Typography>
          </div>
          <MonRankingTableContainer isPreview />
        </div>
        <div className={`grid grid-cols-1 gap-6 xl:grid-cols-${!!user ? 2 : 1} mt-6`}>
          <div className="flex flex-col">
            <Typography weight="semibold" size="lg" className="mb-3">
              New Pokemons
            </Typography>
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
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex items-center mb-3">
                <Typography weight="semibold" size="lg">
                  New Paintings
                </Typography>
                <Typography className="ml-3" as="a" size="sm">
                  More
                </Typography>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
