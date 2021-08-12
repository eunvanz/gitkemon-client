import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { PokeBallType } from "../../types";
import PokeBallImage from "../PokeBallImage";
import Slider from "../Slider/Slider";
import Typography from "../Typography";
import "swiper/swiper.scss";
import styles from "./PokeBallQuantity.module.css";

let startY: number;
const TENSION = 0.85;
const VALID_PULL_LENGTH = 150;

export interface PokeBallQuantityProps {
  pokeBall: {
    type: PokeBallType;
    amount: number;
  };
  onSubmit: (type: PokeBallType, amount: number) => void;
}

const PokeBallQuantity: React.FC<PokeBallQuantityProps> = ({ pokeBall, onSubmit }) => {
  /**
   * 1: 포키볼 싱크, 수량입력 섹션 등장
   * 2: pull to throw 문구 등장
   * 3: 수량입력 섹션 사라지고 포키볼 날아감
   */
  const [animStep, setAnimStep] = useState(0);

  const [amount, setAmount] = useState(1);

  const pokeBallRef = useRef<HTMLImageElement>(null);

  const pokeBallContainerRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);

  const quantityRef = useRef<HTMLDivElement>(null);

  const pullToReadyRef = useRef<HTMLDivElement>(null);

  const [isReleasable, setIsReleasable] = useState(false);

  const maxAmount = useMemo(() => {
    return Math.min(pokeBall.amount, 12);
  }, [pokeBall.amount]);

  const goToNextAnimStep = useCallback(() => {
    setAnimStep((animStep) => animStep + 1);
  }, []);

  const handleOnDrag = useCallback((e) => {
    pokeBallContainerRef.current!.style.transform = `translateY(calc(25vh + ${Math.pow(
      e.y - startY,
      TENSION,
    )}px))`;
    const progress = ((e.y - startY) * 100) / VALID_PULL_LENGTH;
    titleRef.current!.style.opacity = `${100 - progress}%`;
    quantityRef.current!.style.opacity = `${100 - progress}%`;
    pullToReadyRef.current!.style.opacity = `${100 - progress}%`;
    setIsReleasable(progress >= 100);
  }, []);

  const handleOnDragEnd = useCallback(
    (e) => {
      if (e.y - startY > VALID_PULL_LENGTH) {
        // 던져지는 애니메이션
        setIsReleasable(false);
        pokeBallContainerRef.current!.style.transitionTimingFunction = "ease-out";
        pokeBallContainerRef.current!.style.transitionDuration = "0.5s";
        pokeBallContainerRef.current!.style.transform = "translateY(-50vh)";
      } else {
        // 원상복구
        pokeBallContainerRef.current!.style.transitionDuration = "0.5s";
        pokeBallContainerRef.current!.style.transform = "translateY(25vh)";
        titleRef.current!.style.opacity = "1";
        quantityRef.current!.style.opacity = "1";
        pullToReadyRef.current!.style.opacity = "1";
      }
      document.removeEventListener("mousemove", handleOnDrag);
      document.removeEventListener("touchmove", handleOnDrag);
      document.removeEventListener("mouseup", handleOnDragEnd);
      document.removeEventListener("touchend", handleOnDragEnd);
    },
    [handleOnDrag],
  );

  const handleOnDragStart = useCallback(
    (e) => {
      startY = e.y as number;
      pokeBallContainerRef.current!.style.transitionDuration = "0s";
      titleRef.current!.style.transitionDuration = "0s";
      pullToReadyRef.current!.style.transitionDuration = "0s";
      quantityRef.current!.style.transitionDuration = "0s";
      document.addEventListener("mousemove", handleOnDrag);
      document.addEventListener("touchmove", handleOnDrag);
      document.addEventListener("mouseup", handleOnDragEnd);
      document.addEventListener("touchend", handleOnDragEnd);
    },
    [handleOnDrag, handleOnDragEnd],
  );

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (amount < maxAmount) {
          setAmount((amount) => amount + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (amount > 1) {
          setAmount((amount) => amount - 1);
        }
      }
    },
    [amount, maxAmount],
  );

  useEffect(() => {
    setTimeout(goToNextAnimStep, 500);
    setTimeout(goToNextAnimStep, 1000);
    pokeBallRef.current?.addEventListener("mousedown", handleOnDragStart);
    pokeBallRef.current?.addEventListener("touchstart", handleOnDragStart);
    window.addEventListener("keydown", handleOnKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleOnDrag);
      document.removeEventListener("touchmove", handleOnDrag);
      document.removeEventListener("mouseup", handleOnDragEnd);
      document.removeEventListener("touchend", handleOnDragEnd);
      pokeBallRef.current?.removeEventListener("mousedown", handleOnDragStart);
      // eslint-disable-next-line
      pokeBallRef.current?.removeEventListener("touchstart", handleOnDragStart);
      window.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [
    goToNextAnimStep,
    handleOnDrag,
    handleOnDragEnd,
    handleOnDragStart,
    handleOnKeyDown,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div
        ref={titleRef}
        className={cx("mb-10", {
          [styles.appear]: animStep > 0,
          "opacity-0": animStep === 0 || animStep > 2,
        })}
      >
        <Typography as="h2" size="2xl">
          How many?
        </Typography>
      </div>
      <div className={cx("relative w-full", styles.ballContainer)}>
        <div
          className={cx("absolute w-full text-center transition-opacity", {
            "opacity-0": !isReleasable,
          })}
        >
          <Typography color="hint" size="3xl">
            <ChevronDoubleUpIcon className="w-8 h-8 mx-auto animate-bounce" />
            Release to throw
          </Typography>
        </div>
        <div
          ref={quantityRef}
          className={cx("absolute w-40 m-auto text-center", {
            "opacity-0": animStep === 0 || animStep > 2,
            [styles.appear]: animStep === 1 || animStep === 2,
          })}
          style={{ left: "calc(50vw - 5rem" }}
        >
          <Typography as="h1" className="mb-2" size="4xl" color="primary">
            {amount}
          </Typography>
          <Slider
            min={1}
            max={maxAmount}
            onChange={(value) => setAmount(value)}
            value={amount}
          />
          <Typography as="p" className="mt-3" color="hint" weight="light" size="xs">
            <ChevronDoubleRightIcon
              className={cx("w-3 h-3 inline-block mr-1", styles.nudge)}
            />{" "}
            Slide to add
          </Typography>
        </div>
        <div
          ref={pokeBallContainerRef}
          className={cx({
            [styles.sink]: animStep > 0 && animStep < 3,
          })}
        >
          <span ref={pokeBallRef}>
            <PokeBallImage
              draggable={false}
              className={cx("m-auto cursor-pointer", styles.pokeBall)}
              type={pokeBall.type}
            />
          </span>
          <div
            ref={pullToReadyRef}
            className={cx("mt-2 w-full text-center", {
              [styles.appear]: animStep > 1,
              "opacity-0": animStep < 2 || animStep > 2,
            })}
          >
            <Typography color="primary">
              <p className="mb-1">Pull to ready</p>
              <ChevronDoubleDownIcon className="w-4 h-4 mx-auto animate-bounce" />
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.placeholder} />
    </div>
  );
};

export default PokeBallQuantity;
