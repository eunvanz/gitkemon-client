import { UploadIcon } from "@heroicons/react/outline";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import MonCardGrid from "~/components/MonCardGrid";
import PaintingCard from "~/components/PaintingCard";
import Typography from "~/components/Typography";
import { Painting, User } from "~/types";

export interface WorkshopProps {
  paintings?: Painting[];
  onNavigateToUpload: (id: number | "new") => void;
  user?: User;
  onClickLike: (painting: Painting) => void;
  onDelete: (painting: Painting) => void;
  onEdit: (painting: Painting) => void;
  onFetchNextPage: VoidFunction;
  hasNextPage: boolean;
}

const Workshop: React.FC<WorkshopProps> = ({
  paintings,
  onNavigateToUpload,
  user,
  onClickLike,
  onDelete,
  onEdit,
}) => {
  return paintings ? (
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        Pokemon workshop
      </Typography>
      <div className="sticky top-0 z-10 border-b mb-2">
        <div className="flex justify-between items-center p-2 bg-white">
          <Typography as="div">Upload your own work!</Typography>
          <Button
            icon={UploadIcon}
            className="ml-2"
            size="xs"
            color="primary"
            onClick={() => onNavigateToUpload("new")}
          >
            Upload
          </Button>
        </div>
      </div>
      <MonCardGrid>
        {paintings.map((painting) => {
          return (
            <PaintingCard
              key={painting.id}
              painting={painting}
              isManageable={painting.designerId === user?.id}
              onClickLike={() => onClickLike(painting)}
              onDelete={() => onDelete(painting)}
              onEdit={() => onEdit(painting)}
            />
          );
        })}
      </MonCardGrid>
    </div>
  ) : (
    <Loading isFullHeight />
  );
};

export default Workshop;
