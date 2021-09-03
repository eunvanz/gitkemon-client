import withBaseLayout from "~/hocs/withBaseLayout";
import Profile from "./Profile.view";
import useProfileProps from "./useProfileProps";

const ProfilePage: React.FC<void> = () => {
  const props = useProfileProps();

  return <Profile {...props} />;
};

export default withBaseLayout(ProfilePage);
