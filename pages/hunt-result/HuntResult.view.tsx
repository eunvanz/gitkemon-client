import HuntResultComponent, { HuntResultProps } from "../../components/HuntResult";

const HuntResult: React.FC<HuntResultProps> = ({ pokeBallType, result }) => {
  return (
    <div className="relative">
      <HuntResultComponent
        pokeBallType={pokeBallType}
        result={result}
        restPokeBalls={4}
      />
    </div>
  );
};

export default HuntResult;
