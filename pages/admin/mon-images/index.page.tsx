import withAdminBaseLayout from "~/hocs/withAdminBaseLayout";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import MonImages from "./MonImages.view";
import useMonImagesProps from "./useMonImagesProps";

const MonImagesPage: React.FC<void> = () => {
  const props = useMonImagesProps();

  return <MonImages {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({
  isAuthRequired: true,
})();

export default withAdminBaseLayout(MonImagesPage);
