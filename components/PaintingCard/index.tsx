import PaintingCard, { PaintingCardProps } from "./PaintingCard";
import usePaintingCardProps from "./usePaintingCardProps";

export interface PaintingCardContainerProps
  extends Pick<PaintingCardProps, "painting" | "customSize"> {}

const PaintingCardContainer: React.FC<PaintingCardContainerProps> = (containerProps) => {
  const props = usePaintingCardProps(containerProps);

  return <PaintingCard {...props} />;
};

export default PaintingCardContainer;
