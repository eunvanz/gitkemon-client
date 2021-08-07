import { GetServerSideProps, NextPage } from "next";
import api from "../../../../api";
import withAdminBaseLayout from "../../../../hocs/withAdminBaseLayout";
import withAuthServerSideProps from "../../../../hocs/withAuthServerSideProps";
import MonImage from "./MonImage.view";
import useMonImageProps, { UseMonImagePropsParams } from "./useMonImageProps";

const MonImagePage: NextPage<UseMonImagePropsParams> = (params) => {
  const props = useMonImageProps(params);

  return <MonImage {...props} />;
};

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps<{}>({
  isAuthRequired: true,
})(async (ctx) => {
  const { monImageId } = ctx.params as { monImageId: string };
  const isNew = monImageId === "new";
  const ssrMons = await api.getAllMons();
  const ssrMonImage = isNew ? null : await api.getMonImage(Number(monImageId));

  return {
    props: {
      ssrMonImage,
      ssrMons,
    },
  };
});

export default withAdminBaseLayout(MonImagePage);
