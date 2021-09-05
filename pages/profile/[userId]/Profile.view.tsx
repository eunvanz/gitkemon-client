import { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import CollectionStatus, { CollectionStatusProps } from "~/components/CollectionStatus";
import ContributionChart from "~/components/ContributionChart";
import Footer from "~/components/Footer";
import MonCard from "~/components/MonCard";
import SelectButton from "~/components/SelectButton";
import Typography from "~/components/Typography";
import UserProfileHeaderContainer from "~/components/UserProfileHeader";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { PaybackLog, ProfileMon, User, UserProfile } from "~/types";

export interface ProfileProps {
  user?: User;
  userProfile?: UserProfile;
  collectionStatus?: CollectionStatusProps;
  profileMon?: ProfileMon;
  paybacks?: PaybackLog[];
}

const Profile: React.FC<ProfileProps> = ({
  user,
  userProfile,
  collectionStatus,
  profileMon,
  paybacks,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const [chartType, setChartType] = useState<"daily" | "total">("daily");

  return (
    <>
      <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4 content-container">
        <div className="mb-6 border-b pb-4">
          <UserProfileHeaderContainer />
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <div className="flex flex-col">
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
            <div className="flex flex-col mt-4">
              <Typography as="h1">
                Contributions Ranking:{" "}
                <Typography color="primary" weight="bold">
                  {userProfile?.contributionsRank.toLocaleString() || "-"}
                </Typography>
              </Typography>
              {paybacks ? (
                <div className="flex flex-col border rounded m-1 h-72">
                  <div className="flex-shrink-0 flex justify-between p-2 border-b items-center">
                    <Typography className="pl-2">
                      Total:{" "}
                      <Typography color="primary" weight="bold">
                        {userProfile?.lastContributions.toLocaleString() || "-"}
                      </Typography>
                    </Typography>
                    <SelectButton
                      items={[
                        {
                          displayValue: "Daily",
                          value: "daily",
                        },
                        {
                          displayValue: "Total",
                          value: "total",
                        },
                      ]}
                      onChange={(value) => setChartType(value)}
                      value={chartType}
                    />
                  </div>
                  <div ref={chartContainerRef} className="flex-1">
                    <ContributionChart
                      type={chartType}
                      paybackLogs={paybacks}
                      containerRef={chartContainerRef}
                    />
                  </div>
                </div>
              ) : (
                <Skeleton style={{ width: "100%", height: 250 }} />
              )}
            </div>
          </div>
          <div className="xl:col-span-2 xl:col-start-4">
            <div className="flex flex-col">
              <div className="flex-1">
                <Typography as="h1">
                  Top 3 Pokémon Rankings:{" "}
                  <Typography color="primary" weight="bold">
                    {!!profileMon?.topMonRanks.length
                      ? profileMon.topMonRanks
                          .map((rank) => rank.toLocaleString())
                          .join(" - ")
                      : "-"}
                  </Typography>
                </Typography>
                <div className="flex flex-col">
                  {!!profileMon?.topMons ? (
                    profileMon.topMons.length ? (
                      <div className="flex">
                        {profileMon.topMons.map((mon) => (
                          <MonCard
                            key={mon.id}
                            mon={convertCollectionToCardMon(mon)}
                            isOwned
                            user={user}
                            customSize="w-1/3"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-60 flex justify-center items-center border rounded m-1 p-4 border-dashed">
                        <Typography color="hint">No Pokémons</Typography>
                      </div>
                    )
                  ) : (
                    <Skeleton style={{ width: "100%", height: 250 }} />
                  )}
                </div>
              </div>
              <div className="flex-1 mt-8">
                <Typography as="h1">New Pokémons</Typography>
                <div className="flex flex-col">
                  {!!profileMon?.recentMons ? (
                    profileMon.recentMons.length ? (
                      <div className="flex">
                        {profileMon.recentMons.map((mon) => (
                          <MonCard
                            key={mon.id}
                            mon={convertCollectionToCardMon(mon)}
                            isOwned
                            user={user}
                            customSize="w-1/3"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-60 flex justify-center items-center border rounded m-1 p-4 border-dashed">
                        <Typography color="hint">No Pokémons</Typography>
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
      <Footer />
    </>
  );
};

export default Profile;
