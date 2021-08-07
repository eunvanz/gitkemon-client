import { GetServerSideProps, NextPage } from "next";
import withAdminBaseLayout from "../../../../hocs/withAdminBaseLayout";
import withAuthServerSideProps from "../../../../hocs/withAuthServerSideProps";
import MonImage from "./MonImage.view";
import useMonImageProps from "./useMonImageProps";

const MonImagePage: NextPage<{}> = () => {
  const props = useMonImageProps();

  return <MonImage {...props} />;
};

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps<{}>({
  isAuthRequired: true,
})();

export default withAdminBaseLayout(MonImagePage);
