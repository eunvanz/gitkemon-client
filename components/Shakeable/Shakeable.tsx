import { useCallback, useEffect, useRef } from "react";
import cx from "classnames";
import random from "lodash/random";
import { isMobile } from "react-device-detect";
import { colorHashes } from "~/constants/styles";
import { ExtendableHTMLProps } from "~/types";

export interface ShakeableProps extends ExtendableHTMLProps<HTMLDivElement> {
  onChangeDirection: (count: number) => void;
  isActive: boolean;
  onDrag?: VoidFunction;
  onDragEnd?: VoidFunction;
  threshold?: number;
}

const Shakeable = ({
  onChangeDirection,
  isActive,
  children,
  onDrag,
  onDragEnd,
  threshold = 10,
  className,
  ...restProps
}: ShakeableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveRef = useRef<{ x: number; y: number } | null>(null);
  const directionRef = useRef<{ x: boolean; y: boolean } | null>(null);
  const directionChangeCountRef = useRef<number>(0);

  const burstPowder = useCallback(async () => {
    const { burstStar } = await import("~/helpers/animations");
    const burst = () => {
      const { left, top, width, height } = containerRef.current!.getClientRects()[0];
      const parent = document.querySelector("main");
      const parentPosition = parent?.getClientRects()[0];
      const colors = [
        colorHashes.PSYCHIC,
        colorHashes.ICE,
        colorHashes.ELECTRIC,
        colorHashes.GRASS,
        colorHashes.FLYING,
        colorHashes.FIGHTING,
        colorHashes.GHOST,
      ];
      burstStar({
        parent: document.querySelector("main"),
        top: top + height / 2 - (parentPosition?.top || 0),
        left: left + width / 2 - (parentPosition?.left || 0),
        color: [
          colors[random(0, colors.length - 1)],
          colors[random(0, colors.length - 1)],
          colors[random(0, colors.length - 1)],
        ],
        count: 4,
        radius: { 100: 250 },
        duration: 2000,
        itemRadius: "rand(6, 10)",
        degreeShift: "rand(-50, 50)",
      });
    };
    burst();
  }, []);

  const handleOnDrag = useCallback(
    (e: TouchEvent | MouseEvent) => {
      const move = {
        x: (e as MouseEvent).x || (e as TouchEvent).changedTouches[0].clientX,
        y: (e as MouseEvent).y || (e as TouchEvent).changedTouches[0].clientY,
      };
      const lastDirection = directionRef.current;

      const lastMove = lastMoveRef.current || startRef.current!;

      const directionX = move.x - lastMove.x > 0;
      const directionY = move.y - lastMove.y > 0;
      directionRef.current = { x: directionX, y: directionY };

      if (
        (lastDirection?.x !== directionRef.current.x ||
          lastDirection?.y !== directionRef.current.y) &&
        (Math.abs(lastMove.x - move.x) > threshold ||
          Math.abs(lastMove.y - move.y) > threshold)
      ) {
        directionChangeCountRef.current++;
        onChangeDirection(directionChangeCountRef.current);
        burstPowder();
        onDrag?.();
      }

      lastMoveRef.current = { x: move.x, y: move.y };
      containerRef.current!.style.transform = `translate(${
        move.x - startRef.current!.x
      }px, ${move.y - startRef.current!.y}px)`;
    },
    [burstPowder, onChangeDirection, onDrag, threshold],
  );

  const handleOnDragEnd = useCallback(() => {
    containerRef.current!.style.transitionDuration = "0.5s";
    containerRef.current!.style.transform = "translate(0, 0)";
    directionChangeCountRef.current = 0;
    document.removeEventListener("mousemove", handleOnDrag);
    document.removeEventListener("mouseup", handleOnDragEnd);
    onDragEnd?.();
  }, [handleOnDrag, onDragEnd]);

  const handleDragStart = useCallback(
    (e: TouchEvent | MouseEvent) => {
      startRef.current = {
        x: (e as MouseEvent).x || (e as TouchEvent).changedTouches[0].clientX,
        y: (e as MouseEvent).y || (e as TouchEvent).changedTouches[0].clientY,
      };
      containerRef.current!.style.transitionDuration = "0s";
      document.addEventListener("mousemove", handleOnDrag);
      document.addEventListener("mouseup", handleOnDragEnd);
    },
    [handleOnDrag, handleOnDragEnd],
  );

  const handleOnClick = useCallback(() => {
    onChangeDirection(++directionChangeCountRef.current);
    burstPowder();
    onDrag?.();
  }, [burstPowder, onChangeDirection, onDrag]);

  useEffect(() => {
    if (isActive) {
      !isMobile && containerRef.current?.addEventListener("mousedown", handleDragStart);
      isMobile && containerRef.current?.addEventListener("click", handleOnClick);
    } else {
      !isMobile &&
        containerRef.current?.removeEventListener("mousedown", handleDragStart);
      isMobile && containerRef.current?.removeEventListener("click", handleOnClick);
      handleOnDragEnd();
    }
  }, [handleDragStart, handleOnClick, handleOnDragEnd, isActive]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleOnDrag);
      document.removeEventListener("mouseup", handleOnDragEnd);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("cursor-grab", className)} {...restProps} ref={containerRef}>
      {children}
    </div>
  );
};

export default Shakeable;
