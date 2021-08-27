import { Painting } from "../../types";

export interface PaintingCardProps {
  painting: Painting;
}

const PaintingCard: React.FC<PaintingCardProps> = ({ painting }) => {
  return (
    <>
      <div className="flex flex-col p-1 items-center w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8">
        <div className="border rounded shadow transition-shadow hover:shadow-lg"></div>
      </div>
    </>
  );
};

export default PaintingCard;
