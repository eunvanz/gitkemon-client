// import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withBaseLayout from "~/hocs/withBaseLayout";
// import ROUTES from "~/paths";
import Profile from "./Profile.view";
import useProfileProps from "./useProfileProps";

const ProfilePage: React.FC<void> = () => {
  const props = useProfileProps();

  return <Profile {...props} />;
};

// export const getServerSideProps = withAuthServerSideProps({
//   isAuthRequired: false,
// })(async (ctx) => {
//   const { userId } = ctx.params as { userId: string };
//   if (!userId) {
//     return {
//       redirect: {
//         destination: ROUTES.NOT_FOUND,
//         permanent: false,
//       },
//     };
//   }
// });

export default withBaseLayout(ProfilePage);
