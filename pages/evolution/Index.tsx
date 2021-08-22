import withBaseLayout from "../../hocs/withBaseLayout";
import Evolution from "./Evolution.view";
import useEvolutionProps from "./useEvolutionProps";

const EvolutionPage: React.FC<void> = () => {
  const props = useEvolutionProps();

  return <Evolution {...props} />;
};

export default withBaseLayout(EvolutionPage);
