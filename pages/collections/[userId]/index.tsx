import api from "../../../api";
import withAuthServerSideProps from "../../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../../hocs/withBaseLayout";
import ROUTES from "../../../paths";
import { Collection, Mon, UserProfile } from "../../../types";
import Collections from "./Collections.view";
import useCollectionsProps from "./useCollectionsProps";

export interface CollectionsPageProps {
  ssrMons: Mon[];
  ssrCollections: Collection[];
  ssrCollectionUser: UserProfile;
}

const CollectionsPage: React.FC<CollectionsPageProps> = (
  ssrProps: CollectionsPageProps,
) => {
  const props = useCollectionsProps(ssrProps);

  return <Collections {...props} />;
};

export const getServerSideProps = withAuthServerSideProps<CollectionsPageProps>({
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
  const [ssrMons, ssrCollections, ssrCollectionUser] = await Promise.all([
    api.getActiveMons(),
    api.getUserCollections(userId),
    api.getUserProfile(userId),
  ]);
  return {
    props: {
      ssrMons,
      ssrCollections,
      ssrCollectionUser,
    },
  };
});

export default withBaseLayout(CollectionsPage);
