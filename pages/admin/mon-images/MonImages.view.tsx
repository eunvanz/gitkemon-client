import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/ControlledInput";
import Select from "../../../components/Select";
import Typography from "../../../components/Typography";
import { Mon, MonTier } from "../../../types";

interface MonImagesFormValue {
  monId: number;
  colPoint: number;
  evolveFromId?: number;
  tier: MonTier;
}

export interface MonImagesProps {
  defaultFormValues?: MonImagesFormValue;
  mons?: Mon[];
}

const MonImages: React.FC<MonImagesProps> = ({ defaultFormValues, mons }) => {
  const { control, handleSubmit } = useForm<MonImagesFormValue>({
    defaultValues: defaultFormValues,
  });

  return mons ? (
    <>
      <div className="p-4 border-gray-200 border-b">
        <Typography as="h1" weight="bold" size="xl">
          Mon Image Registration
        </Typography>
      </div>
      <div className="flex-col p-4">
        <div className="flex-shrink-1">
          <ControlledInput
            control={control}
            name="monId"
            input={Select}
            inputProps={{
              label: "Mon",
              items: mons.map((mon) => ({
                ...mon,
                displayValue: `${mon.id} - ${mon.nameKo || mon.name}`,
              })),
            }}
          />
        </div>
      </div>
    </>
  ) : null;
};

export default MonImages;
