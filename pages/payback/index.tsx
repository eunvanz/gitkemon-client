import withAuthServerSideProps from "../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../hocs/withBaseLayout";
import Payback from "./Payback.view";
import usePaybackProps from "./usePaybackProps";

const PaybackPage: React.FC<void> = () => {
  const props = usePaybackProps();

  return <Payback {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({
  isAuthRequired: true,
})();

export default withBaseLayout(PaybackPage);
