import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withAdminBaseLayout from "../../../hocs/withAdminBaseLayout";
import Mons from "./Mons.view";
import useMonsProps from "./useMonsProps";

const MonsPage: React.FC<void> = () => {
  const props = useMonsProps();

  return <Mons {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })();

export default withAdminBaseLayout(MonsPage);
