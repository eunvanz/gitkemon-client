import { useMemo } from "react";
import { getLocaleProperty } from "../../helpers/projectHelpers";
import { Painting } from "../../types";
import Likes from "../Likes";
import Typography from "../Typography";

export interface PaintingCardProps {
  painting: Painting;
  isLiked: boolean;
  onClickLike: () => void;
}

const PaintingCard: React.FC<PaintingCardProps> = ({
  painting,
  isLiked,
  onClickLike,
}) => {
  const monName = useMemo(() => {
    return getLocaleProperty(painting.mon!, "name");
  }, [painting.mon]);

  return (
    <div className="flex flex-col p-1 items-center w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8">
      <div className="border rounded shadow transition-shadow hover:shadow-lg">
        <div className="flex-1 p-1 bg-white rounded">
          <div className="flex justify-center">
            {/* eslint-disable-next-line */}
            <img src={painting.imageUrl} alt={monName} />
          </div>
        </div>
        <div className="flex-col bg-gray-50 py-1 w-full rounded-b">
          <div className="flex flex-row flex-1 my-1.5 justify-center">
            <Likes likesCnt={painting.likesCnt} isLiked={isLiked} onClick={onClickLike} />
          </div>
          <div className="flex flex-row flex-1 my-1 justify-center">
            <Typography color="primary">{monName}</Typography>
            Painting by <Typography color="primary">{painting.designerName}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingCard;
