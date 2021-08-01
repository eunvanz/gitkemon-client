import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/ControlledInput";
import FileInput from "../../../components/FileInput";
import Input from "../../../components/Input";
import SearchableSelect from "../../../components/SearchableSelect";
import Select from "../../../components/Select";
import Typography from "../../../components/Typography";
import { Mon, MonTier } from "../../../types";

interface MonImagesFormValue {
  monId: number;
  colPoint: number;
  evolveFromId?: number;
  tier: MonTier;
  designerName: string;
}

export interface MonImagesProps {
  defaultFormValues?: MonImagesFormValue;
  mons?: Mon[];
  imageFile?: File;
  onSelectImageFile: (file: File) => void;
  onDeleteImageFile: () => void;
}

const MonImages: React.FC<MonImagesProps> = ({
  defaultFormValues,
  mons,
  imageFile,
  onSelectImageFile,
  onDeleteImageFile,
}) => {
  const { control, watch, handleSubmit } = useForm<MonImagesFormValue>({
    defaultValues: defaultFormValues,
  });

  const { monId } = watch();

  const isRegisteredMon = useMemo(() => {
    return mons?.find((item) => item.id === monId)?.__has_monImages__;
  }, [monId, mons]);

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
            input={SearchableSelect}
            inputProps={{
              label: "Mon",
              items: mons.map((mon) => ({
                value: mon.id,
                displayValue: `${mon.id} - ${mon.nameKo || mon.name}`,
              })),
              placeholder: "Select a mon",
            }}
            className="w-full sm:w-48"
            rules={{ required: "A mon should be selected" }}
          />
        </div>
        <div className="flex-shrink-1 mt-3">
          <FileInput
            accept="image/png"
            maxFiles={1}
            selectedFiles={imageFile ? [imageFile] : undefined}
            onSelectFiles={(files) => onSelectImageFile(files[0])}
            onDeleteFile={onDeleteImageFile}
            label="Image"
          />
        </div>
        <div className="flex-shrink-1 mt-3">
          <ControlledInput
            control={control}
            name="designerName"
            input={Input}
            inputProps={{
              label: "Designer name",
            }}
            rules={{ required: "Designer name is required" }}
            className="w-full sm:w-48"
          />
        </div>
        {monId && !isRegisteredMon && (
          <div className="flex-shrink-1 mt-3">
            <ControlledInput
              control={control}
              name="designerName"
              input={Input}
              inputProps={{
                label: "Designer name",
              }}
              rules={{ required: "Designer name is required" }}
              className="w-full sm:w-48"
            />
          </div>
        )}
      </div>
    </>
  ) : null;
};

export default MonImages;
