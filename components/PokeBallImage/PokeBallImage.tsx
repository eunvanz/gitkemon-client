import { useMemo } from "react";
import cx from "classnames";
import { ExtendableHTMLProps, PokeBallType } from "../../types";
import imgBasicRareBall from "../../images/pokeball-basic-rare.png";
import imgBasicBall from "../../images/pokeball-basic.png";
import imgEliteBall from "../../images/pokeball-elite.png";
import imgLegendBall from "../../images/pokeball-legend.png";
import imgRareBall from "../../images/pokeball-rare.png";
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
        return imgBasicBall;
      case "basicRare":
        return imgBasicRareBall;
      case "rare":
        return imgRareBall;
      case "elite":
        return imgEliteBall;
      case "legend":
        return imgLegendBall;
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
