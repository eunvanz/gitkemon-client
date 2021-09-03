import api from "~/api";
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

  return <Payback {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({
  isAuthRequired: true,
})(async (ctx, ssrUser) => {
  const accessToken = ctx.req.cookies[process.env.ACCESS_TOKEN_HEADER_NAME as string];
  const ssrAvailableContributions = await api.getAvailableContributions(accessToken);
  return {
    props: {
      ssrUser,
      ssrAvailableContributions,
    },
  };
});

export default withBaseLayout(PaybackPage);
