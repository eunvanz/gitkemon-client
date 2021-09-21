import Head from "next/head";
import api from "~/api";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withBaseLayout from "~/hocs/withBaseLayout";
import { Mon, Painting, User } from "~/types";
import PaintingUpload from "./PaintingUpload.view";
import usePaintingUploadProps from "./usePaintingUploadProps";

export interface PaintingUploadPageProps {
  ssrMons: Mon[];
  ssrPainting: Painting | null;
  ssrUser: User | null;
}

const PaintingUploadPage: React.FC<PaintingUploadPageProps> = (
  ssrProps: PaintingUploadPageProps,
) => {
  const props = usePaintingUploadProps(ssrProps);

  return (
    <>
      <Head>
        <title>Upload painting - Gitkémon</title>
      </Head>
      <PaintingUpload {...props} />
    </>
  );
};

export const getServerSideProps = withAuthServerSideProps<PaintingUploadPageProps>({
  isAuthRequired: true,
})(async (ctx, user) => {
  const ssrMons = await api.getAllMons();
  const { paintingId } = ctx.query;
  let ssrPainting = null;
  if (paintingId !== "new") {
    ssrPainting = await api.getPainting(Number(paintingId));
  }
  return {
    props: {
      ssrMons,
      ssrPainting,
      ssrUser: user,
    },
  };
});

export default withBaseLayout(PaintingUploadPage);
