import Skeleton from "react-loading-skeleton";
import CollectionStatus, { CollectionStatusProps } from "~/components/CollectionStatus";
import MonCard from "~/components/MonCard";
import Typography from "~/components/Typography";
import UserProfileHeaderContainer from "~/components/UserProfileHeader";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { PaybackLog, ProfileMon, User, UserProfile } from "~/types";

export interface ProfileProps {
  user?: User;
  userProfile?: UserProfile;
  collectionStatus?: CollectionStatusProps;
  profileMon?: ProfileMon;
  // paybacks: PaybackLog[];
}

const Profile: React.FC<ProfileProps> = ({
  user,
  userProfile,
  collectionStatus,
  profileMon,
  // paybacks,
}) => {
  return (
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      {/* <UserProfileHeaderContainer /> */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-start-1 md:col-span-1 lg:col-span-3">
          <Typography as="h1">
            Collection Ranking:{" "}
            <Typography color="primary" weight="bold">
              {userProfile?.collectionRank.toLocaleString() || "-"}
            </Typography>
          </Typography>
          {collectionStatus ? (
            <CollectionStatus {...collectionStatus} customSize="grid-cols-2" />
          ) : (
            <Skeleton style={{ width: "100%", height: 300 }} />
          )}
        </div>
        <div className="md:col-start-2 lg:col-span-2 lg:col-start-4">
          <div className="flex flex-col">
            <div className="flex-1">
              <Typography as="h1">
                Top 3 Pokemon Rankings:{" "}
                <Typography color="primary" weight="bold">
                  {!!profileMon?.topMonRanks.length
                    ? profileMon.topMonRanks
                        .map((rank) => rank.toLocaleString())
                        .join(" - ")
                    : "-"}
                </Typography>
              </Typography>
              <div className="flex flex-wrap">
                {!!profileMon?.topMons ? (
                  profileMon.topMons.length ? (
                    profileMon.topMons.map((mon) => (
                      <MonCard
                        key={mon.id}
                        mon={convertCollectionToCardMon(mon)}
                        isOwned
                        user={user}
                        customSize="w-1/3"
                      />
                    ))
                  ) : (
                    <div className="w-full h-60 flex justify-center items-center border rounded m-1 p-4 border-dashed">
                      <Typography color="hint">No Pokemons</Typography>
                    </div>
                  )
                ) : (
                  <Skeleton style={{ width: "100%", height: 300 }} />
                )}
              </div>
            </div>
            <div className="flex-1 mt-8">
              <Typography as="h1">Recently updated Pokemons</Typography>
              <div className="flex flex-wrap">
                {!!profileMon?.recentMons ? (
                  profileMon.recentMons.length ? (
                    profileMon.recentMons.map((mon) => (
                      <MonCard
                        key={mon.id}
                        mon={convertCollectionToCardMon(mon)}
                        isOwned
                        user={user}
                        customSize="w-1/3"
                      />
                    ))
                  ) : (
                    <div className="w-full h-60 flex justify-center items-center border rounded m-1 p-4 border-dashed">
                      <Typography color="hint">No Pokemons</Typography>
                    </div>
                  )
                ) : (
                  <Skeleton style={{ width: "100%", height: 300 }} />
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
