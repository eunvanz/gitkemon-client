import { useMemo } from "react";
import cx from "classnames";
import Image, { ImageProps } from "next/image";
import { PokeBallType } from "../../types";
import imgBasicRareBall from "../../images/pokeball-basic-rare.png";
import imgBasicBall from "../../images/pokeball-basic.png";
import imgEliteBall from "../../images/pokeball-elite.png";
import imgLegendBall from "../../images/pokeball-legend.png";
import imgRareBall from "../../images/pokeball-rare.png";
import styles from "./PokeBallImage.module.css";

export type PokeBallImageProps = { type: PokeBallType } & Omit<ImageProps, "src" | "alt">;

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
    // @ts-ignore
    <Image
      className={cx(className, styles.dragNone)}
      src={img}
      alt="Poke ball"
      quality={100}
      {...restProps}
    />
  );
};

export default PokeBallImage;
