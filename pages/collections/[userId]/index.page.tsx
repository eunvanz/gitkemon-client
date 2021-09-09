import withAuthServerSideProps from "../../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../../hocs/withBaseLayout";
import ROUTES from "../../../paths";
import Collections from "./Collections.view";
import useCollectionsProps from "./useCollectionsProps";

const CollectionsPage: React.FC<void> = () => {
  const props = useCollectionsProps();

  return <Collections {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({
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
});

export default withBaseLayout(CollectionsPage);
