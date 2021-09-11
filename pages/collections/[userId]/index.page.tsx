import { GetServerSideProps } from "next";
import withBaseLayout from "../../../hocs/withBaseLayout";
import Collections from "./Collections.view";
import useCollectionsProps from "./useCollectionsProps";

export interface CollectionPageProps {
  userId: string;
}

const CollectionsPage: React.FC<CollectionPageProps> = (pageProps) => {
  const props = useCollectionsProps(pageProps);

  return <Collections {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = ctx.params as { userId: string };
  return {
    props: {
      userId,
    },
  };
};

export default withBaseLayout(CollectionsPage);
