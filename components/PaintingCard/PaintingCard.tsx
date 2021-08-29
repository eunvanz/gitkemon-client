import { useCallback, useMemo, useState } from "react";
import { getLocaleProperty } from "~/helpers/projectHelpers";
import { Painting } from "~/types";
import Badge from "../Badge";
import Dialog from "../Dialog";
import Likes from "../Likes";
import PaintingModal, { PaintingModalProps } from "../PaintingModal/PaintingModal";
import Typography from "../Typography";

export interface PaintingCardProps
  extends Omit<PaintingModalProps, "isOpen" | "onClose"> {
  painting: Painting;
  onClickLike: () => void;
}

const PaintingCard: React.FC<PaintingCardProps> = ({
  painting,
  onClickLike,
  onDelete,
  ...restProps
}) => {
  const monName = useMemo(() => {
    return getLocaleProperty(painting.mon!, "name");
  }, [painting.mon]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnDelete = useCallback(async () => {
    setIsModalOpen(false);
    const isConfirmed = await Dialog.confirm({
      title: "Delete work",
      content: "Are you sure to delete your work?",
    });
    if (isConfirmed) {
      onDelete();
    } else {
      setIsModalOpen(true);
    }
  }, [onDelete]);

  return (
    <>
      <div
        className="flex flex-col p-1 items-center w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/6 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
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
                <Typography as="div" className="text-center" color="gray" size="sm">
                  by <Typography color="primary">{painting.designerName}</Typography>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaintingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClickLike={onClickLike}
        painting={painting}
        onDelete={handleOnDelete}
        {...restProps}
      />
    </>
  );
};

export default PaintingCard;
