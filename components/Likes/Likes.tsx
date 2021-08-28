import { useMemo } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import cx from "classnames";
import { ExtendableHTMLProps } from "../../types";
import Button from "../Button";
import styles from "./Likes.module.css";

export interface LikesProps extends ExtendableHTMLProps<HTMLDivElement> {
  likesCnt: number;
  isLiked: boolean;
  onClick: () => void;
}

const Likes: React.FC<LikesProps> = ({ likesCnt, isLiked, onClick, ...restProps }) => {
  const icon = useMemo(() => {
    return isLiked ? HeartIconSolid : HeartIcon;
  }, [isLiked]);

  return (
    <div {...restProps}>
      <Button className={cx(styles.svgPink)} color="transparent" icon={icon}>
        {likesCnt.toLocaleString()}
      </Button>
    </div>
  );
};

export default Likes;
