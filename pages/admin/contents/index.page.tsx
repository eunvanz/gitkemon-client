import withAdminBaseLayout from "~/hocs/withAdminBaseLayout";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import Contents from "./Contents.view";
import useContentsProps from "./useContentsProps";

const ContentsPage: React.FC<void> = () => {
  const props = useContentsProps();

  return <Contents {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })();

export default withAdminBaseLayout(ContentsPage);
