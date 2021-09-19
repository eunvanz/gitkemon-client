import { useRouter } from "next/router";
import ContentsTableContainer from "~/components/ContentsTable";
import ContributionStatus, {
  ContributionStatusProps,
} from "~/components/ContributionStatus";
import Footer from "~/components/Footer";
import MonCard from "~/components/MonCard";
import MonRankingTableContainer from "~/components/MonRankingTable";
import PaintingCardContainer from "~/components/PaintingCard";
import PokeBallStatus from "~/components/PokeBallStatus";
import RareNewsCard from "~/components/RareNewsCard";
import Typography from "~/components/Typography";
import UserRankingTableContainer from "~/components/UserRankingTable";
import { convertMonToCardMon, convertMonToModalMon } from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import { Mon, Painting, RareNews } from "~/types";

export interface HomeProps extends ContributionStatusProps {
  newMons?: Mon[];
  newPaintings?: Painting[];
  rareNews?: RareNews[];
}

const Home: React.FC<HomeProps> = ({
  availableContributions,
  lastPayback,
  user,
  newMons,
  newPaintings,
  rareNews,
}) => {
  const router = useRouter();

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
              <Typography
                className="ml-3"
                as="a"
                size="sm"
                onClick={() => router.push(`${ROUTES.RANKINGS}?tab=collection`)}
              >
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
              <Typography
                className="ml-3"
                as="a"
                size="sm"
                onClick={() => router.push(`${ROUTES.RANKINGS}?tab=contribution`)}
              >
                More
              </Typography>
            </div>
            <UserRankingTableContainer isPreview type="contributions" />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center mb-3">
            <Typography weight="semibold" size="lg">
              Top 3 Pokémons
            </Typography>
            <Typography
              className="ml-3"
              as="a"
              size="sm"
              onClick={() => router.push(`${ROUTES.RANKINGS}?tab=pokemon`)}
            >
              More
            </Typography>
          </div>
          <MonRankingTableContainer isPreview />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-6">
          <div className="flex flex-col">
            <Typography weight="semibold" size="lg" className="mb-3">
              New Pokémons
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
            <div className="flex items-center mt-6 mb-3">
              <Typography weight="semibold" size="lg">
                New Paintings
              </Typography>
              <Typography
                className="ml-3"
                as="a"
                size="sm"
                onClick={() => router.push(ROUTES.WORKSHOP)}
              >
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
          <div className="flex">
            <div className="flex flex-col w-full">
              <Typography className="mb-3" weight="semibold" size="lg">
                Bad News
              </Typography>
              {rareNews?.map((item) => (
                <RareNewsCard className="mb-2" key={item.id} item={item} />
              ))}
              <Typography className="mb-3 mt-6" weight="semibold" size="lg">
                Notices
                <Typography
                  className="ml-3"
                  as="a"
                  size="sm"
                  onClick={() => router.push(`${ROUTES.CONTENTS}/notice`)}
                >
                  More
                </Typography>
              </Typography>
              <ContentsTableContainer contentType="notice" isPreview />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
