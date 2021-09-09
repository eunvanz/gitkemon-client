import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withBaseLayout from "../../hocs/withBaseLayout";
import Evolution from "./Evolution.view";
import useEvolutionProps from "./useEvolutionProps";

const EvolutionPage: React.FC<void> = () => {
  const props = useEvolutionProps();

  return <Evolution {...props} />;
};

export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })();

export default withBaseLayout(EvolutionPage);
