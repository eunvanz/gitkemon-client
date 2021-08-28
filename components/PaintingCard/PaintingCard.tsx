import { getLocaleProperty } from "../../helpers/projectHelpers";
import { Painting } from "../../types";

export interface PaintingCardProps {
  painting: Painting;
}

const PaintingCard: React.FC<PaintingCardProps> = ({ painting }) => {
  return (
    <>
      <div className="flex flex-col p-1 items-center w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8">
        <div className="border rounded shadow transition-shadow hover:shadow-lg">
          <div className="flex-1 p-1 bg-white rounded">
            <div className="flex justify-center">
              {/* eslint-disable-next-line */}
              <img
                src={painting.imageUrl}
                alt={getLocaleProperty(painting.__mon__!, "name")}
              />
            </div>
          </div>
          <div className="flex-col bg-gray-50 py-1 w-full rounded-b">
            <div className="flex flex-row flex-1 my-1.5 justify-center"></div>
            <div className="flex flex-row flex-1 my-1 justify-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaintingCard;
