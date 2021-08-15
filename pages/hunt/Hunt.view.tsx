import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PokeBallDrop, { PokeBallDropProps } from "../../components/PokeBallDrop";
import PokeBallQuantity, {
  PokeBallQuantityProps,
} from "../../components/PokeBallQuantity/PokeBallQuantity";
import SelectPokeBall, { SelectPokeBallProps } from "../../components/SelectPokeBall";
import { PokeBallType } from "../../types";

export interface HuntProps
  extends Pick<SelectPokeBallProps, "pokeBalls">,
    Pick<PokeBallQuantityProps, "onSubmit">,
    Pick<PokeBallDropProps, "onFinish"> {}

const Hunt: React.FC<HuntProps> = ({ pokeBalls, onSubmit, onFinish }) => {
  const [step, setStep] = useState(0); // 0: 포키볼 선택, 1: 포키볼 수량 선택, 2: 포키볼 드랍

  const [selectedPokeBall, setSelectedPokeBall] = useState<{
    type: PokeBallType;
    amount: number;
  } | null>(null);

  const moveToChooseQuantity = useCallback(
    (type: PokeBallType) => {
      const selectedPokeBall = pokeBalls.find((pokeBall) => pokeBall.type === type);
      if (selectedPokeBall) {
        setSelectedPokeBall(selectedPokeBall);
        setStep(1);
      }
    },
    [pokeBalls],
  );

  const handleOnSubmit = useCallback(
    (type: PokeBallType, amount: number) => {
      onSubmit(type, amount);
      setStep(2);
    },
    [onSubmit],
  );

  return (
    <div className="relative min-h-full">
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ ease: "easeIn", duration: 0.5 }}
          >
            <div className="relative">
              <SelectPokeBall pokeBalls={pokeBalls} onNext={moveToChooseQuantity} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 1 && selectedPokeBall && (
          <motion.div
            className="absolute w-full top-0"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <div className="relative">
              <PokeBallQuantity pokeBall={selectedPokeBall} onSubmit={handleOnSubmit} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {step === 2 && selectedPokeBall && (
        <PokeBallDrop type={selectedPokeBall.type} onFinish={onFinish} />
      )}
    </div>
  );
};

export default Hunt;
