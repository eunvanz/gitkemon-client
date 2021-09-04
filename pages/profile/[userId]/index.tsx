import { GetServerSideProps } from "next";
import api from "~/api";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withBaseLayout from "~/hocs/withBaseLayout";
import ROUTES from "~/paths";
import { Collection, Mon, PaybackLog, ProfileMon, UserProfile } from "~/types";
import Profile from "./Profile.view";
import useProfileProps from "./useProfileProps";

export interface ProfilePageProps {
  ssrUserProfile: UserProfile;
  ssrPaybacks: PaybackLog[];
  ssrCollections: Collection[];
  ssrMons: Mon[];
  ssrProfileMon: ProfileMon;
}

const ProfilePage: React.FC<ProfilePageProps> = (ssrProps: ProfilePageProps) => {
  const props = useProfileProps(ssrProps);

  return <Profile {...props} />;
};

export const getServerSideProps = withAuthServerSideProps<ProfilePageProps>({
  isAuthRequired: false,
})(async (ctx) => {
  const { userId } = ctx.params as { userId: string };
  if (!userId) {
    return {
      redirect: {
        destination: ROUTES.NOT_FOUND,
        permanent: false,
      },
    };
  }
  const [
    ssrUserProfile,
    ssrPaybacks,
    ssrCollections,
    ssrMons,
    ssrProfileMon,
  ] = await Promise.all([
    api.getUserProfile(userId),
    api.getPaybackHistory(userId),
    api.getUserCollections(userId),
    api.getActiveMons(),
    api.getProfileMons(userId),
  ]);
  return {
    props: {
      ssrUserProfile,
      ssrPaybacks,
      ssrCollections,
      ssrMons,
      ssrProfileMon,
    },
  };
});

export default withBaseLayout(ProfilePage);
