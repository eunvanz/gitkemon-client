import { GetServerSideProps } from "next";
import Head from "next/head";
import withBaseLayout from "~/hocs/withBaseLayout";
import Profile from "./Profile.view";
import useProfileProps from "./useProfileProps";

export interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = (pageProps) => {
  const props = useProfileProps(pageProps);

  return (
    <>
      <Head>
        <title>{props.userProfile?.nickname || "User"}&apos;s profile - Gitkémon</title>
      </Head>
      <Profile {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = ctx.params as { userId: string };
  return {
    props: { userId },
  };
};

export default withBaseLayout(ProfilePage);
