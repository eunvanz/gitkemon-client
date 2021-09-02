import { CollectionStatusProps } from "~/components/CollectionStatus";
import { Collection, Painting, PaybackLog, User } from "~/types";

export interface ProfileProps {
  user: User;
  profileUser: User;
  collectionRank: number;
  collectionStatus: CollectionStatusProps;
  monRank: number;
  representativeMon: Collection;
  contributionsRank: number;
  paybacks: PaybackLog[];
  paintings: Painting[];
}

const Profile: React.FC<ProfileProps> = ({
  user,
  profileUser,
  collectionRank,
  collectionStatus,
  monRank,
  representativeMon,
  contributionsRank,
  paybacks,
  paintings,
}) => {
  return (
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            {/* eslint-disable-next-line */}
            <img
              className="h-16 w-16 rounded-full"
              src={profileUser.githubUser!.avatar_url}
              alt="user image"
            />
            <span
              className="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profileUser.nickname}</h1>
          <p className="text-sm font-medium text-gray-500">
            {profileUser.githubLogin}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        {
          user.id === profileUser.id &&
          <Button>
        }
      </div>
    </div>
  );
};

export default Profile;
