import Image from "next/image";
import { Painting } from "~/types";
import BaseModal, { BaseModalProps } from "../BaseModal";
import Button from "../Button";

export interface PaintingModalProps extends BaseModalProps {
  painting: Painting;
  isManageable: boolean;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  onClose: VoidFunction;
}

const PaintingModal: React.FC<PaintingModalProps> = ({
  painting,
  isManageable,
  onEdit,
  onDelete,
  ...restProps
}) => {
  return (
    <BaseModal
      isCloseButtonVisible
      className="w-full md:max-w-lg"
      footer={
        <div className="text-right">
          {isManageable && (
            <>
              <Button className="mr-1" onClick={onEdit}>
                Edit
              </Button>
              <Button className="mr-1" onClick={onDelete}>
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
        <div className="w-48 border border-dotted mb-1 mx-auto flex-shrink-0">
          <Image
            src={painting.imageUrl}
            alt={painting.mon.name}
            quality={100}
            width={250}
            height={250}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default PaintingModal;
