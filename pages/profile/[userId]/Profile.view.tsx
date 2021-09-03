import CollectionStatus, { CollectionStatusProps } from "~/components/CollectionStatus";
import MonCard from "~/components/MonCard";
import Typography from "~/components/Typography";
import UserProfileHeaderContainer from "~/components/UserProfileHeader";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { Collection, Painting, PaybackLog, User } from "~/types";

export interface ProfileProps {
  user: User;
  // profileUser: User;
  collectionRank: number;
  collectionStatus: CollectionStatusProps;
  monRanks: number[];
  topMons: Collection[];
  recentMons: Collection[];
  // contributionsRank: number;
  // paybacks: PaybackLog[];
  // paintings: Painting[];
  totalPaintings: number;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  // profileUser,
  collectionRank,
  collectionStatus,
  monRanks,
  topMons,
  recentMons,
  // contributionsRank,
  // paybacks,
  // paintings,
  totalPaintings,
}) => {
  return (
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      {/* <UserProfileHeaderContainer /> */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-start-1 md:col-span-1 lg:col-span-3">
          <Typography as="h1">
            Collection Ranking:{" "}
            <Typography color="primary" weight="bold">
              {collectionRank.toLocaleString()}
            </Typography>
          </Typography>
          <CollectionStatus {...collectionStatus} customSize="grid-cols-2" />
        </div>
        <div className="md:col-start-2 lg:col-span-2 lg:col-start-4">
          <div className="flex flex-col">
            <div className="flex-1">
              <Typography as="h1">
                Top 3 Pokemon Rankings:{" "}
                <Typography color="primary" weight="bold">
                  {!!monRanks.length
                    ? monRanks.map((rank) => rank.toLocaleString()).join(" - ")
                    : "-"}
                </Typography>
              </Typography>
              <div className="flex flex-wrap">
                {!!topMons.length ? (
                  topMons.map((mon) => (
                    <MonCard
                      key={mon.id}
                      mon={convertCollectionToCardMon(mon)}
                      isOwned
                      user={user}
                      customSize="w-1/3"
                    />
                  ))
                ) : (
                  <div className="w-full h-60 flex justify-center items-center border rounded m-1 p-4">
                    <Typography color="hint">
                      No Pokemons. Check-in and get some Pokemon friends!
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 mt-8">
              <Typography as="h1">Recently updated Pokemons</Typography>
              <div className="flex flex-wrap">
                {!!recentMons.length ? (
                  recentMons.map((mon) => (
                    <MonCard
                      key={mon.id}
                      mon={convertCollectionToCardMon(mon)}
                      isOwned
                      user={user}
                      customSize="w-1/3"
                    />
                  ))
                ) : (
                  <div className="w-full h-60 flex justify-center items-center border rounded m-1 p-4">
                    <Typography color="hint">
                      No Pokemons. Check-in and get some Pokemon friends!
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
