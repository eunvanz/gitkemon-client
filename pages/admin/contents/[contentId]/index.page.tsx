import withAdminBaseLayout from "~/hocs/withAdminBaseLayout";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import Content from "./Content.view";
import useContentProps from "./useContentProps";

const ContentPage: React.FC<void> = () => {
  const props = useContentProps();

  return <Content {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })();

export default withAdminBaseLayout(ContentPage);
