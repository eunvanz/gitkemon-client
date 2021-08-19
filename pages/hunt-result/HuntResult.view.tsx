import { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../components/Button";
import HuntResultComponent from "../../components/HuntResult";
import { HuntResponse, PokeBallType } from "../../types";

export interface HuntResultProps {
  pokeBallType: PokeBallType;
  result?: HuntResponse;
  count: number;
}

const HuntResult: React.FC<HuntResultProps> = ({ pokeBallType, result, count }) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  return (
    <div className="relative min-h-full">
      <HuntResultComponent
        pokeBallType={pokeBallType}
        result={result}
        onComplete={() => setIsButtonsVisible(true)}
      />
      <AnimatePresence>
        {isButtonsVisible && (
          <motion.div
            className="flex justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button>Choose Pokeball</Button>
            {count && (
              <Button className="ml-2">
                Keep hunting
                {count > 1 && (
                  <>
                    <XIcon className="mx-1 w-4 h-4" />
                    {count}
                  </>
                )}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HuntResult;
