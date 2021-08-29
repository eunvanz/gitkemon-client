import { useCallback, useMemo, useRef, useState } from "react";
import { random } from "lodash";
import { colorHashes } from "~/constants/styles";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { Collection, HuntResult } from "~/types";
import HuntResultItem from "../HuntResultItem";
import MonCard from "../MonCard";
import Shakeable from "../Shakeable";

export interface EvolutionCardProps {
  evolveMon: Collection;
  result: HuntResult;
}

const EvolutionCard: React.FC<EvolutionCardProps> = ({ evolveMon, result }) => {
  const [progress, setProgress] = useState(0);

  const handleOnChangeDirection = useCallback((count: number) => {
    setProgress(count);
  }, []);

  const isProgressComplete = useMemo(() => {
    return progress >= 20;
  }, [progress]);

  const monCardRef = useRef<HTMLDivElement>(null);

  const burstPowder = useCallback(async () => {
    const { burstStar } = await import("~/helpers/animations");
    const burst = () => {
      const { left, top } = monCardRef.current!.getClientRects()[0];
      const colors = [
        colorHashes.PSYCHIC,
        colorHashes.ICE,
        colorHashes.ELECTRIC,
        colorHashes.GRASS,
        colorHashes.FLYING,
        colorHashes.FIRE,
      ];
      burstStar({
        top: top + 120,
        left: left + 90,
        color: [
          colors[random(0, colors.length - 1)],
          colors[random(0, colors.length - 1)],
          colors[random(0, colors.length - 1)],
        ],
        count: 3,
        radius: { 100: 250 },
        duration: 2000,
        itemRadius: 10,
        degreeShift: "rand(-50, 50)",
      });
    };
    burst();
  }, []);

  return (
    <Shakeable
      onChangeDirection={handleOnChangeDirection}
      isActive={!isProgressComplete}
      className="relative"
      onDrag={burstPowder}
    >
      <div ref={monCardRef}>
        {!isProgressComplete && (
          <MonCard
            mon={convertCollectionToCardMon(evolveMon)}
            isClickDisabled
            className={`absolute opacity-${100 - 5 * progress} transition-opacity z-20`}
          />
        )}
        {!isProgressComplete && (
          <MonCard
            mon={convertCollectionToCardMon(result.newCollection)}
            isClickDisabled
            className={`opacity-${progress * 5} transition-opacity`}
          />
        )}
        {isProgressComplete && (
          <HuntResultItem huntResult={result} isRevealed isMonCardSize />
        )}
      </div>
    </Shakeable>
  );
};

export default EvolutionCard;
