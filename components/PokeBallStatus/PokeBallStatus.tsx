import { useMemo } from "react";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import { PokeBall, PokeBallType } from "~/types";
import Button from "../Button";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";

export interface PokeBallStatusProps {
  pokeBall: PokeBall;
}

const PokeBallStatus: React.FC<PokeBallStatusProps> = ({ pokeBall }) => {
  const router = useRouter();

  const hasNoPokeBalls = useMemo(() => {
    const {
      basicPokeBalls,
      basicRarePokeBalls,
      rarePokeBalls,
      elitePokeBalls,
      legendPokeBalls,
    } = pokeBall;
    return (
      basicPokeBalls +
        basicRarePokeBalls +
        rarePokeBalls +
        elitePokeBalls +
        legendPokeBalls ===
      0
    );
  }, [pokeBall]);

  return (
    <div className="border rounded-md flex flex-col md:flex-row justify-between items-center p-4">
      <div className="flex justify-between w-full md:w-80 mb-4 md:mb-0">
        {["basic", "basicRare", "rare", "elite", "legend"].map((type) => (
          <div key={type} className="flex flex-col items-center justify-center">
            <PokeBallImage width={40} height={40} type={type as PokeBallType} />
            <Typography weight="bold" color="primary" className="mt-1">
              {pokeBall[`${type}PokeBalls` as keyof PokeBall].toLocaleString()}
            </Typography>
          </div>
        ))}
      </div>
      <Button
        disabled={hasNoPokeBalls}
        onClick={() => router.push(ROUTES.HUNT)}
        className="w-full md:w-auto"
      >
        Get Pokemons
      </Button>
    </div>
  );
};

export default PokeBallStatus;
