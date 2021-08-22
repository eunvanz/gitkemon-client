import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import ControlledInput from "../../../../components/ControlledInput";
import FileInput from "../../../../components/FileInput";
import Input from "../../../../components/Input";
import SearchableSelect from "../../../../components/SearchableSelect";
import Select from "../../../../components/Select";
import Typography from "../../../../components/Typography";
import { MON_TIERS } from "../../../../constants/rules";
import { capitalize } from "../../../../helpers/commonHelpers";
import { Mon, MonTier } from "../../../../types";

export interface MonImageFormValues {
  monId: number;
  colPoint: number;
  evolutionRequiredLevel?: number;
  tier: MonTier;
  designerName: string;
}

export interface MonImageProps {
  defaultFormValues?: MonImageFormValues;
  mons?: Mon[];
  imageFile?: File;
  onSelectImageFile: (file: File) => void;
  onDeleteImageFile: () => void;
  isSubmitting: boolean;
  onSubmit: (values: MonImageFormValues) => void;
  onNavigateToList: VoidFunction;
  isLoading: boolean;
  selectedMon?: Mon;
  onSelectMon: (monId: number) => void;
}

const MonImage: React.FC<MonImageProps> = ({
  defaultFormValues,
  mons,
  imageFile,
  onSelectImageFile,
  onDeleteImageFile,
  isSubmitting,
  onSubmit,
  onNavigateToList,
  isLoading,
  selectedMon,
  onSelectMon,
}) => {
  const {
    control,
    watch,
    setValue,
    formState,
    handleSubmit,
  } = useForm<MonImageFormValues>({
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { monId, evolutionRequiredLevel } = watch();

  const isRegisteredMon = useMemo(() => {
    return selectedMon?.__monImages__?.length;
  }, [selectedMon?.__monImages__?.length]);

  const submitForm = useCallback(() => {
    handleSubmit((formValues) => {
      if (!imageFile) {
        alert("An image is required.");
      }
      onSubmit(formValues);
    })();
  }, [handleSubmit, imageFile, onSubmit]);

  const onSelectFiles = useCallback(
    (files: File[]) => {
      onSelectImageFile(files[0]);
    },
    [onSelectImageFile],
  );

  const evolveFromMon = useMemo(() => {
    return mons?.find((mon) => mon.id === selectedMon?.evolveFromId);
  }, [mons, selectedMon?.evolveFromId]);

  useEffect(() => {
    if (evolutionRequiredLevel) {
      setValue("colPoint", (evolveFromMon?.colPoint || 0) * evolutionRequiredLevel);
    }
  }, [evolutionRequiredLevel, evolveFromMon?.colPoint, setValue]);

  return !isLoading ? (
    <div className="w-full p-8 bg-white">
      <div className="border-gray-200 border-b sm:px-0">
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
              items: mons!.map((mon) => ({
                value: mon.id,
                displayValue: `${mon.id}-${mon.nameKo || mon.name}`,
              })),
              placeholder: "Select a mon",
              disabled: isSubmitting,
              className: "sm:w-60",
              onChange: onSelectMon,
            }}
            className="w-full"
            rules={{ required: "A mon should be selected" }}
          />
        </div>
        <div className="flex-shrink-1 mt-3">
          <FileInput
            accept="image/png"
            maxFiles={1}
            selectedFiles={imageFile ? [imageFile] : undefined}
            onSelectFiles={onSelectFiles}
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
              className: "sm:w-60",
            }}
            rules={{ required: "Designer name is required" }}
            className="w-full"
          />
        </div>
        {!!monId && !isRegisteredMon && !defaultFormValues && (
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
                defaultValue={1}
              />
            </div>
            <div className="flex-shrink-1 mt-3">
              <ControlledInput
                control={control}
                name="tier"
                input={Select}
                inputProps={{
                  label: "Tier",
                  items: MON_TIERS.map((tier) => ({
                    value: tier,
                    displayValue: capitalize(tier),
                  })),
                  disabled: isSubmitting,
                  hint: `Total: ${selectedMon?.total} / Suggestion: ${selectedMon?.tier}`,
                }}
                rules={{
                  required: "Tier is required",
                }}
                className="w-full sm:w-60"
              />
            </div>
            {!!selectedMon?.evolveFromId && (
              <div className="flex-shrink-1 mt-3">
                <ControlledInput
                  control={control}
                  name="evolutionRequiredLevel"
                  input={Input}
                  inputProps={{
                    label: "Evolution required level",
                    type: "number",
                    disabled: isSubmitting,
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "Evolution required level is required.",
                    },
                  }}
                  className="w-full sm:w-60"
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="border-t border-gray-200 pt-4 text-right">
        <Button
          color="white"
          className="mr-1"
          disabled={isSubmitting}
          onClick={onNavigateToList}
        >
          List
        </Button>
        <Button
          isLoading={isSubmitting}
          disabled={!formState.isValid || !imageFile}
          onClick={submitForm}
          color="primary"
        >
          Save
        </Button>
      </div>
    </div>
  ) : null;
};

export default MonImage;
