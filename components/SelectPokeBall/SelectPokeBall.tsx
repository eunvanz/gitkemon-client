import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PokeBallType } from "../../types";
import Button from "../Button";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";
import styles from "./SelectPokeBall.module.css";

export interface SelectPokeBallProps {
  pokeBalls: {
    type: PokeBallType;
    amount: number;
  }[];
  onNext: (type: PokeBallType) => void;
}

const SelectPokeBall: React.FC<SelectPokeBallProps> = ({ pokeBalls, onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperCore>();

  const activePokeBall = useMemo(() => {
    return pokeBalls[activeIndex];
  }, [activeIndex, pokeBalls]);

  const itemInfo = useMemo(() => {
    switch (activePokeBall?.type) {
      case "basic":
        return {
          title: "BASIC",
          description: "It's a pretty common Pokéball.",
        };
      case "basicRare":
        return {
          title: "HALF RARE",
          description: "If you are lucky, you can catch rare Pokémon.",
        };
      case "rare":
        return {
          title: "RARE",
          description: "A Pokéball that attracts rare Pokémon.",
        };
      case "elite":
        return {
          title: "ELITE",
          description:
            "It is a Pokéball so strong that even a powerful Pokémon cannot escape.",
        };
      case "legend":
        return {
          title: "LEGEND",
          description: "It feels like catching a legendary Pokémon.",
        };
    }
  }, [activePokeBall?.type]);

  const handleOnClickNext = useCallback(() => {
    onNext(activePokeBall?.type);
  }, [activePokeBall?.type, onNext]);

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          swiperRef.current?.slidePrev();
          break;
        case "ArrowRight":
          swiperRef.current?.slideNext();
          break;
        case "Enter":
          handleOnClickNext();
          break;
      }
    },
    [handleOnClickNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleOnKeyDown);
    return () => {
      window.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [handleOnKeyDown]);

  return activePokeBall ? (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-10">
        <Typography as="h2" size="2xl">
          Select a Pokéball
        </Typography>
      </div>
      <div className="relative w-full">
        {pokeBalls.length > 1 && (
          <>
            <div className={cx("absolute md:left-1/4 left-10 z-10", styles.left)}>
              <button onClick={() => swiperRef.current?.slidePrev()}>
                <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className={cx("absolute md:right-1/4 right-10 z-10", styles.right)}>
              <button onClick={() => swiperRef.current?.slideNext()}>
                <ChevronDoubleRightIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </>
        )}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(e) => {
            setActiveIndex(e.realIndex);
          }}
          loop={pokeBalls.length > 1}
        >
          {pokeBalls.map((pokeBall) => (
            <SwiperSlide key={pokeBall.type}>
              <PokeBallImage className="mx-auto" type={pokeBall.type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          className="text-center p-4 h-40 mt-5"
          initial={{ opacity: 0, position: "absolute" }}
          animate={{ opacity: 1, position: "relative" }}
        >
          <Typography className="block mb-2" color="primary" as="h2" size="2xl">
            {itemInfo.title}
          </Typography>
          <Typography className="text-center">{itemInfo.description}</Typography>
          <Typography as="p" color="hint" className="mt-3">
            Quantity:{" "}
            <Typography color="primary">
              {activePokeBall?.amount.toLocaleString()}
            </Typography>
          </Typography>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4">
        <Button
          color="primary"
          size="lg"
          className="md:w-96 w-60"
          onClick={handleOnClickNext}
        >
          Next
        </Button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-10 text-center">
        <Typography as="h2" size="2xl">
          Yon have no Pokéball 😢
        </Typography>
        <Button color="white" size="xs">
          Check out available payback
        </Button>
      </div>
    </div>
  );
};

export default SelectPokeBall;
