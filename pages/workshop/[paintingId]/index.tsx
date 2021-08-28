import api from "../../../api";
import withBaseLayout from "../../../hocs/withBaseLayout";
import { Mon } from "../../../types";
import PaintingUpload from "./PaintingUpload.view";
import usePaintingUploadProps from "./usePaintingUploadProps";

export interface PaintingUploadPageProps {
  ssrMons: Mon[];
}

const PaintingUploadPage: React.FC<PaintingUploadPageProps> = (
  ssrProps: PaintingUploadPageProps,
) => {
  const props = usePaintingUploadProps(ssrProps);

  return <PaintingUpload {...props} />;
};

export const getServerSideProps = async () => {
  const ssrMons = await api.getAllMons();
  return {
    props: {
      ssrMons,
    },
  };
};

export default withBaseLayout(PaintingUploadPage);
