import { NextPage } from "next";
import withAdminBaseLayout from "../../../../hocs/withAdminBaseLayout";
import withAuthServerSideProps from "../../../../hocs/withAuthServerSideProps";
import MonImage from "./MonImage.view";
import useMonImageProps, { UseMonImagePropsParams } from "./useMonImageProps";

const MonImagePage: NextPage<UseMonImagePropsParams> = (params) => {
  const props = useMonImageProps(params);

  return <MonImage {...props} />;
};

// getAllMonsWithImages API가 너무 무거워서 주석처리, useMonsQuery의 캐시 사용
// export const getServerSideProps = withAuthServerSideProps<UseMonImagePropsParams>({
//   isAuthRequired: true,
// })(async (ctx) => {
//   const { monImageId } = ctx.params as { monImageId: string };
//   const isNew = isNaN(Number(monImageId));
//   const ssrMons = await api.getAllMonsWithImages();
//   const ssrMonImage = isNew ? null : await api.getMonImage(Number(monImageId));

//   return {
//     props: {
//       ssrMonImage,
//       ssrMons,
//     },
//   };
// });

export const getServerSideProps = withAuthServerSideProps<UseMonImagePropsParams>({
  isAuthRequired: true,
})();

export default withAdminBaseLayout(MonImagePage);
