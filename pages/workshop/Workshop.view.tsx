import { UploadIcon } from "@heroicons/react/outline";
import Button from "~/components/Button";
import Intersection from "~/components/Intersection";
import Loading from "~/components/Loading";
import MonCardGrid from "~/components/MonCardGrid";
import PaintingCardContainer from "~/components/PaintingCard";
import Typography from "~/components/Typography";
import { Painting, User } from "~/types";

export interface WorkshopProps {
  paintings?: Painting[];
  onNavigateToUpload: (id: number | "new") => void;
  onFetchNextPage: VoidFunction;
  hasNextPage: boolean;
}

const Workshop: React.FC<WorkshopProps> = ({
  paintings,
  onNavigateToUpload,
  hasNextPage,
  onFetchNextPage,
}) => {
  return paintings ? (
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        Pokémon workshop
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
          return <PaintingCardContainer key={painting.id} painting={painting} />;
        })}
      </MonCardGrid>
      <Intersection onIntersect={() => hasNextPage && onFetchNextPage()} />
    </div>
  ) : (
    <Loading isFullHeight />
  );
};

export default Workshop;
