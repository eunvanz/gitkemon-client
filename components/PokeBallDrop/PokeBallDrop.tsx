import { AnimatePresence, motion } from "framer-motion";
import { PokeBallType } from "../../types";
import PokeBallImage from "../PokeBallImage";

export interface PokeBallDropProps {
  type: PokeBallType;
}

const PokeBallDrop: React.FC<PokeBallDropProps> = ({ type }) => {
  return (
    <div className="flex min-h-screen justify-center align-middle">
      <AnimatePresence>
        <motion.div className="w-full text-center">
          <PokeBallImage type={type} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PokeBallDrop;
