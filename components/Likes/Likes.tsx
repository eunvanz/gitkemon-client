import { useMemo } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import cx from "classnames";
import { ExtendableHTMLProps } from "../../types";
import Button, { ButtonProps } from "../Button";
import styles from "./Likes.module.css";

export interface LikesProps extends Omit<ExtendableHTMLProps<HTMLDivElement>, "size"> {
  likesCnt: number;
  isLiked: boolean;
  onClick: () => void;
  size?: ButtonProps["size"];
}

const Likes: React.FC<LikesProps> = ({
  likesCnt,
  isLiked,
  onClick,
  size,
  ...restProps
}) => {
  const icon = useMemo(() => {
    return isLiked ? HeartIconSolid : HeartIcon;
  }, [isLiked]);

  return (
    <div {...restProps}>
      <Button
        size={size}
        className={cx(styles.svgPink)}
        color="transparent"
        icon={icon}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {likesCnt.toLocaleString()}
      </Button>
    </div>
  );
};

export default Likes;
