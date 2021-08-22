import api from "../../../api";
import withAuthServerSideProps from "../../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../../hocs/withBaseLayout";
import ROUTES from "../../../paths";
import { Collection, Mon } from "../../../types";
import Collections from "./Collections.view";
import useCollectionsProps from "./useCollectionsProps";

export interface CollectionsPageProps {
  ssrMons: Mon[];
  ssrCollections: Collection[];
}

const CollectionsPage: React.FC<CollectionsPageProps> = (
  ssrProps: CollectionsPageProps,
) => {
  const props = useCollectionsProps(ssrProps);

  return <Collections {...props} />;
};

export const getServerSideProps = withAuthServerSideProps<{
  ssrMons: Mon[];
  ssrCollections: Collection[];
}>({
  isAuthRequired: false,
})(async (ctx) => {
  const { userId } = ctx.params as { userId: string };
  if (!userId) {
    return {
      redirect: {
        destination: ROUTES.NOT_FOUND,
        permanent: false,
      },
    };
  }
  const ssrMons = await api.getActiveMons();
  const ssrCollections = await api.getUserCollections(userId);
  return {
    props: {
      ssrMons,
      ssrCollections,
    },
  };
});

export default withBaseLayout(CollectionsPage);
