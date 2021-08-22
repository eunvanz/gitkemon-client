import { useMemo } from "react";
import cx from "classnames";
import { ExtendableHTMLProps, PokeBallType } from "../../types";
import styles from "./PokeBallImage.module.css";

export type PokeBallImageProps = { type: PokeBallType } & Omit<
  ExtendableHTMLProps<HTMLImageElement>,
  "crossOrigin"
>;

const PokeBallImage: React.FC<PokeBallImageProps> = ({
  type,
  className,
  ...restProps
}) => {
  const img = useMemo(() => {
    switch (type) {
      case "basic":
        return "/images/pokeball-basic.png";
      case "basicRare":
        return "/images/pokeball-basic-rare.png";
      case "rare":
        return "/images/pokeball-rare.png";
      case "elite":
        return "/images/pokeball-elite.png";
      case "legend":
        return "/images/pokeball-legend.png";
    }
  }, [type]);

  return (
    // eslint-disable-next-line
    <img
      className={cx(className, styles.dragNone)}
      src={img}
      alt="Poke ball"
      {...restProps}
    />
  );
};

export default PokeBallImage;
