import { GetServerSidePropsContext } from "next";
import api from "../../../api";
import withBaseLayout from "../../../hocs/withBaseLayout";
import { Mon, Painting } from "../../../types";
import PaintingUpload from "./PaintingUpload.view";
import usePaintingUploadProps from "./usePaintingUploadProps";

export interface PaintingUploadPageProps {
  ssrMons: Mon[];
  ssrPainting: Painting;
}

const PaintingUploadPage: React.FC<PaintingUploadPageProps> = (
  ssrProps: PaintingUploadPageProps,
) => {
  const props = usePaintingUploadProps(ssrProps);

  return <PaintingUpload {...props} />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const ssrMons = await api.getAllMons();
  const { paintingId } = ctx.query;
  let ssrPainting = undefined;
  if (paintingId !== "new") {
    ssrPainting = await api.getPainting(Number(paintingId));
  }
  return {
    props: {
      ssrMons,
      ssrPainting,
    },
  };
};

export default withBaseLayout(PaintingUploadPage);
