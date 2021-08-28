import { useMemo } from "react";
import { getLocaleProperty } from "../../helpers/projectHelpers";
import { Painting } from "../../types";
import Badge from "../Badge";
import Likes from "../Likes";
import Typography from "../Typography";

export interface PaintingCardProps {
  painting: Painting;
  onClickLike: () => void;
}

const PaintingCard: React.FC<PaintingCardProps> = ({ painting, onClickLike }) => {
  const monName = useMemo(() => {
    return getLocaleProperty(painting.mon!, "name");
  }, [painting.mon]);

  return (
    <div className="flex flex-col p-1 items-center w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8">
      <div className="relative w-full h-full">
        <div className="border rounded shadow">
          <div className="flex-1 p-1 bg-white rounded">
            {painting.isRegistered && (
              <div className="absolute right-1 top-0.5 sm:right-2 sm:top-1.5">
                <Badge color="blue" label="Registered" size="sm" />
              </div>
            )}
            <div className="flex justify-center">
              {/* eslint-disable-next-line */}
              <img src={painting.imageUrl} alt={monName} />
            </div>
          </div>
          <div className="flex-col bg-gray-50 py-1 w-full rounded-b">
            <div className="flex flex-1 justify-center">
              <Likes
                size="sm"
                likesCnt={painting.likesCnt}
                isLiked={painting.isLiked}
                onClick={onClickLike}
              />
            </div>
            <div className="flex flex-col flex-1 my-1 justify-center items-center">
              <Typography as="h4" weight="bold" color="primary">
                {monName}
              </Typography>
              <Typography as="div" className="text-center" color="hint" size="sm">
                by <Typography color="primary">{painting.designerName}</Typography>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingCard;
