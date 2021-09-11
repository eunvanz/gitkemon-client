import withAdminBaseLayout from "~/hocs/withAdminBaseLayout";
import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import Content from "./Content.view";
import useContentProps from "./useContentProps";

export interface ContentPageProps {
  contentId: string;
}

const ContentPage: React.FC<ContentPageProps> = (pageProps) => {
  const props = useContentProps(pageProps);

  return <Content {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })(
  async (ctx) => {
    const { contentId } = ctx.params as { contentId: string };
    return {
      props: {
        contentId,
      },
    };
  },
);

export default withAdminBaseLayout(ContentPage);
