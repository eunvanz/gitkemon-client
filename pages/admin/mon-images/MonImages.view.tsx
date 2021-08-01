import { useController, useForm } from "react-hook-form";
import ControlledInput from "../../../components/ControlledInput";
import Typography from "../../../components/Typography";
import { MonTier } from "../../../types";

export interface MonImagesProps {
  defaultFormValues?: MonImagesFormValue;
}

interface MonImagesFormValue {
  monId: number;
  colPoint: number;
  evolveFromId?: number;
  tier: MonTier;
}

const MonImages: React.FC<MonImagesProps> = ({ defaultFormValues }) => {
  const { control } = useForm<MonImagesFormValue>();

  return (
    <>
      <div className="p-4 border-gray-200 border-b">
        <Typography as="h1" weight="bold" size="xl">
          Mon Image Registration
        </Typography>
      </div>
      <div className="flex-col">
        <div className="flex-shrink-1"></div>
      </div>
    </>
  );
};

export default MonImages;
