import cx from "classnames";
import Image from "next/image";
import { MonImage, MonPotential, MonTier } from "../../types";

export interface MonCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mon: {
    name: string;
    description: string;
    firstType: string;
    secondType?: string;
    height: number;
    weight: number;
    tier: MonTier;
    evolutionLevel?: number;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    colPoint: number;
    level?: number;
    potential?: MonPotential;
    image?: MonImage;
  };
}

const MonCard: React.FC<MonCardProps> = ({ mon, className, ...restProps }) => {
  return (
    <div className={cx("flex flex-col-rounded-lg shadow-lg", className)} {...restProps}>
      <div className="flex-shrink-0 m-1">
        <Image src={mon.image ? mon.image.imageUrl : ""} alt={mon.name} layout="fill" />
      </div>
    </div>
  );
};

export default MonCard;
