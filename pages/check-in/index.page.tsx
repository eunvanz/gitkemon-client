import Head from "next/head";
import { User } from "~/types";
import withAuthServerSideProps from "../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../hocs/withBaseLayout";
import Payback from "./Payback.view";
import usePaybackProps from "./usePaybackProps";

export interface PaybackPageProps {
  ssrAvailableContributions: number;
  ssrUser: User;
}

const PaybackPage: React.FC<PaybackPageProps> = (pageProps) => {
  const props = usePaybackProps(pageProps);

  return (
    <>
      <Head>
        <title>Check-in - Gitkémon</title>
      </Head>
      <Payback {...props} />
    </>
  );
};

export const getServerSideProps = withAuthServerSideProps({
  isAuthRequired: true,
})();

export default withBaseLayout(PaybackPage);
