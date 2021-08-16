import HuntResult from "../../components/HuntResult/HuntResult";
import { HuntResponse, PokeBallType } from "../../types";

export interface HuntResultProps {
  pokeBallType: PokeBallType;
  result?: HuntResponse;
}

const huntResult: React.FC<HuntResultProps> = ({ pokeBallType, result }) => {
  return (
    <div className="relative min-h-full">
      <HuntResult pokeBallType={pokeBallType} result={result} />
    </div>
  );
};

export default huntResult;
