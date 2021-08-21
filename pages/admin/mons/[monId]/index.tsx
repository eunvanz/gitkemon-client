import withAdminBaseLayout from "../../../../hocs/withAdminBaseLayout";
import Mon from "./Mon.view";
import useMonProps from "./useMonProps";

const MonPage: React.FC<void> = () => {
  const props = useMonProps();

  return <Mon {...props} />;
};

export default withAdminBaseLayout(MonPage);
