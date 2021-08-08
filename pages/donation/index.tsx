import withBaseLayout from "../../hocs/withBaseLayout";
import Donation from "./Donation.view";
import useDonationProps from "./useDonationProps";

const DonationPage: React.FC<void> = () => {
  const props = useDonationProps();

  return <Donation {...props} />;
};

export default withBaseLayout(DonationPage);
