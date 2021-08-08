import withAuthServerSideProps from "../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../hocs/withBaseLayout";
import Donation from "./Donation.view";
import useDonationProps from "./useDonationProps";

const DonationPage: React.FC<void> = () => {
  const props = useDonationProps();

  return <Donation {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({
  isAuthRequired: true,
})();

export default withBaseLayout(DonationPage);
