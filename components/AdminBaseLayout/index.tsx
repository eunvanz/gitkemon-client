import { User } from "../../types";
import AdminBaseLayout from "./AdminBaseLayout";
import useAdminBaseLayoutProps from "./useAdminBaseLayoutProps";

export interface AdminBaseLayoutContainerProps {
  user?: User;
}

const AdminBaseLayoutContainer: React.FC<AdminBaseLayoutContainerProps> = ({
  children,
  user,
}) => {
  const props = useAdminBaseLayoutProps({ children, user });

  return <AdminBaseLayout {...props} />;
};

export default AdminBaseLayoutContainer;
