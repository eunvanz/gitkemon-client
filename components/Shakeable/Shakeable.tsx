import { useCallback, useEffect, useRef } from "react";
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
  ...restProps
}: ShakeableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveRef = useRef<{ x: number; y: number } | null>(null);
  const directionRef = useRef<{ x: boolean; y: boolean } | null>(null);
  const directionChangeCountRef = useRef<number>(0);

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
        onDrag?.();
      }

      lastMoveRef.current = { x: move.x, y: move.y };
      containerRef.current!.style.transform = `translate(${
        move.x - startRef.current!.x
      }px, ${move.y - startRef.current!.y}px)`;
    },
    [onChangeDirection, onDrag, threshold],
  );

  const handleOnDragEnd = useCallback(() => {
    containerRef.current!.style.transitionDuration = "0.5s";
    containerRef.current!.style.transform = "translate(0, 0)";
    directionChangeCountRef.current = 0;
    document.removeEventListener("mousemove", handleOnDrag);
    document.removeEventListener("touchmove", handleOnDrag);
    document.removeEventListener("mouseup", handleOnDragEnd);
    document.removeEventListener("touchend", handleOnDragEnd);
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
      document.addEventListener("touchmove", handleOnDrag);
      document.addEventListener("mouseup", handleOnDragEnd);
      document.addEventListener("touchend", handleOnDragEnd);
    },
    [handleOnDrag, handleOnDragEnd],
  );

  useEffect(() => {
    if (isActive) {
      containerRef.current?.addEventListener("mousedown", handleDragStart);
      containerRef.current?.addEventListener("touchstart", handleDragStart);
    } else {
      containerRef.current?.removeEventListener("mousedown", handleDragStart);
      containerRef.current?.removeEventListener("touchstart", handleDragStart);
      handleOnDragEnd();
    }
  }, [handleDragStart, handleOnDragEnd, isActive]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleOnDrag);
      document.removeEventListener("touchmove", handleOnDrag);
      document.removeEventListener("mouseup", handleOnDragEnd);
      document.removeEventListener("touchend", handleOnDragEnd);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div {...restProps} ref={containerRef}>
      {children}
    </div>
  );
};

export default Shakeable;
