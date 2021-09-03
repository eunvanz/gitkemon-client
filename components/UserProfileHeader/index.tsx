import UserProfileHeader from "./UserProfileHeader";
import useUserProfileHeaderProps from "./useUserProfileHeaderProps";

const UserProfileHeaderContainer: React.FC<{}> = () => {
  const props = useUserProfileHeaderProps();

  return <UserProfileHeader {...props} />;
};

export default UserProfileHeaderContainer;
