import Head from "next/head";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withBaseLayout from "~/hocs/withBaseLayout";
import HuntResult from "./HuntResult.view";
import useHuntResultProps from "./useHuntResultProps";

const HuntResultPage: React.FC<void> = () => {
  const props = useHuntResultProps();

  return (
    <>
      <Head>
        <title>Hunt result - Gitkémon</title>
      </Head>
      <HuntResult {...props} />
    </>
  );
};

export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })();

export default withBaseLayout(HuntResultPage);
