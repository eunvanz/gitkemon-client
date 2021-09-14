import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { getLocaleProperty } from "~/helpers/projectHelpers";
import { Painting } from "~/types";
import BaseModal, { BaseModalProps } from "../BaseModal";
import Button from "../Button";
import Likes from "../Likes";
import Typography from "../Typography";

dayjs.extend(relativeTime);

export interface PaintingModalProps extends Omit<BaseModalProps, "children"> {
  painting: Painting;
  isManageable: boolean;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  onClose: VoidFunction;
  onClickLike: VoidFunction;
}

const PaintingModal: React.FC<PaintingModalProps> = ({
  painting,
  isManageable,
  onEdit,
  onDelete,
  onClickLike,
  ...restProps
}) => {
  return (
    <BaseModal
      isCloseButtonVisible
      className="w-full md:max-w-xs"
      footer={
        <div className="text-right">
          {isManageable && (
            <>
              <Button className="mr-1" onClick={onEdit}>
                Edit
              </Button>
              <Button color="danger" className="mr-1" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}
          <Button color="transparent" onClick={restProps.onClose}>
            Close
          </Button>
        </div>
      }
      {...restProps}
    >
      <div className="flex flex-col items-center">
        <div className="mb-1 mx-auto flex-shrink-0">
          {/* eslint-disable-next-line */}
          <img
            src={painting.imageUrl}
            alt={painting.mon.name}
            // quality={100}
            width={250}
            height={250}
          />
        </div>
        <div className="mx-auto my-1">
          <Likes
            size="md"
            likesCnt={painting.likesCnt}
            isLiked={painting.isLiked}
            onClick={onClickLike}
          />
        </div>
        <div className="mx-auto text-center my-1">
          <Typography as="h2" weight="bold" color="primary">
            {getLocaleProperty(painting.mon, "name")}
          </Typography>
          <Typography as="div" className="text-center" color="gray" size="sm">
            Painting by <Typography color="primary">{painting.designerName}</Typography>
          </Typography>
        </div>
        <div className="mx-auto my-1">
          <Typography color="hint" size="xs" weight="light">
            {painting.createdAt === painting.updatedAt ? "created" : "updated"} at{" "}
            {dayjs(painting.updatedAt).fromNow()}
          </Typography>
        </div>
      </div>
    </BaseModal>
  );
};

export default PaintingModal;
