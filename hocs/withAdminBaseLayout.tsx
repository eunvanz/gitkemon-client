import compose from "compose-function";
import AdminBaseLayoutContainer from "../components/AdminBaseLayout";
import withAuth from "./withAuth";

const withAdminBaseLayout = (WrappedComponent: React.FC<any>) => {
  const Wrapper = (props: any) => {
    return (
      <AdminBaseLayoutContainer>
        <WrappedComponent {...props} />
      </AdminBaseLayoutContainer>
    );
  };

  return Wrapper;
};

export default compose(withAdminBaseLayout, withAuth);
