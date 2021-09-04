import withAdminBaseLayout from "../../../hocs/withAdminBaseLayout";
import Mons from "./Mons.view";
import useMonsProps from "./useMonsProps";

const MonsPage: React.FC<void> = () => {
  const props = useMonsProps();

  return <Mons {...props} />;
};

export default withAdminBaseLayout(MonsPage);
