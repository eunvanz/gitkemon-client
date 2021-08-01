import { useMemo } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
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
  isSubmitting: boolean;
}

const MonImages: React.FC<MonImagesProps> = ({
  defaultFormValues,
  mons,
  imageFile,
  onSelectImageFile,
  onDeleteImageFile,
  isSubmitting,
}) => {
  const { control, watch, setValue, handleSubmit } = useForm<MonImagesFormValue>({
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { monId } = watch();

  const isRegisteredMon = useMemo(() => {
    return mons?.find((item) => item.id === monId)?.__monImages__?.length;
  }, [monId, mons]);

  return mons ? (
    <form className="max-w-3xl mx-auto">
      <div className="p-4 border-gray-200 border-b sm:px-0">
        <Typography as="h1" weight="bold" size="xl">
          Mon Image Registration
        </Typography>
      </div>
      <div className="flex-col px-4 py-8 sm:px-0">
        <div className="flex-shrink-1">
          <ControlledInput
            control={control}
            name="monId"
            input={SearchableSelect}
            inputProps={{
              label: "Mon",
              items: mons.map((mon) => ({
                value: mon.id,
                displayValue: `${mon.id}-${mon.nameKo || mon.name}`,
              })),
              placeholder: "Select a mon",
              disabled: isSubmitting,
            }}
            className="w-full sm:w-60"
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
            disabled={isSubmitting}
          />
        </div>
        <div className="flex-shrink-1 mt-4">
          <ControlledInput
            control={control}
            name="designerName"
            input={Input}
            inputProps={{
              label: "Designer name",
              disabled: isSubmitting,
            }}
            rules={{ required: "Designer name is required" }}
            className="w-full sm:w-60"
          />
        </div>
        {monId && !isRegisteredMon && (
          <>
            <div className="flex-shrink-1 mt-3">
              <ControlledInput
                control={control}
                name="colPoint"
                input={Input}
                inputProps={{
                  label: "Collection point",
                  type: "number",
                  disabled: isSubmitting,
                }}
                rules={{
                  required: "Collection point is required",
                  min: { value: 1, message: "Collection point should be over 0" },
                }}
                className="w-full sm:w-60"
              />
            </div>
            <div className="flex-shrink-1 mt-3">
              <ControlledInput
                control={control}
                name="tier"
                input={Select}
                inputProps={{
                  label: "Tier",
                  items: [
                    {
                      value: "basic",
                      displayValue: "Basic",
                    },
                    {
                      value: "special",
                      displayValue: "Special",
                    },
                    {
                      value: "rare",
                      displayValue: "Rare",
                    },
                    {
                      value: "s.rare",
                      displayValue: "S.Rare",
                    },
                    {
                      value: "elite",
                      displayValue: "Elite",
                    },
                    {
                      value: "legend",
                      displayValue: "Legend",
                    },
                  ],
                  disabled: isSubmitting,
                }}
                rules={{
                  required: "Tier is required",
                }}
                className="w-full sm:w-60"
              />
            </div>
            <div className="flex-shrink-1 mt-3">
              <ControlledInput
                control={control}
                name="evolveFromId"
                input={SearchableSelect}
                inputProps={{
                  label: "Evolve from",
                  items: mons
                    .filter((item) => item.id !== monId)
                    .map((item) => ({
                      value: item.id,
                      displayValue: `${item.id}-${item.nameKo || item.name}`,
                    })),
                  onClear: () => setValue("evolveFromId", undefined),
                }}
                className="w-full sm:w-60"
              />
            </div>
          </>
        )}
      </div>
      <div className="border-t border-gray-200 py-4 text-right">
        <Button color="white" className="mr-1">
          Back
        </Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  ) : null;
};

export default MonImages;
