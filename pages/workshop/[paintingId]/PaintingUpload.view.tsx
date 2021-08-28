import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import ControlledInput from "../../../components/ControlledInput";
import Dialog from "../../../components/Dialog";
import FileInput from "../../../components/FileInput";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import SearchableSelect from "../../../components/SearchableSelect";
import Typography from "../../../components/Typography";
import getCroppedImg, { convertFileToBase64 } from "../../../helpers/commonHelpers";
import { getLocaleProperty } from "../../../helpers/projectHelpers";
import { Mon } from "../../../types";

export interface PaintingUploadFormValues {
  designerName?: string;
  monId?: number;
}

export interface PaintingUploadProps {
  defaultValues?: PaintingUploadFormValues;
  onSubmit: (values: PaintingUploadFormValues & { image: string }) => void;
  isSubmitting: boolean;
  mons?: Mon[];
  onNavigateToList: VoidFunction;
}

const PaintingUpload: React.FC<PaintingUploadProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  mons,
  onNavigateToList,
}) => {
  const { control, handleSubmit, formState } = useForm<PaintingUploadFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleOnSelectFile = useCallback(async (files: File[]) => {
    const image = await convertFileToBase64(files[0]);
    setSelectedImage(image as string);
  }, []);

  const submitForm = useCallback(() => {
    handleSubmit(async (formValues, error) => {
      if (!selectedImage || !croppedAreaPixels) {
        return Dialog.show({ content: "An image is required." });
      }
      const image = await getCroppedImg(selectedImage, croppedAreaPixels);
      onSubmit({ ...formValues, image });
    })();
  }, [croppedAreaPixels, handleSubmit, onSubmit, selectedImage]);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return !mons ? (
    <Loading isFullHeight />
  ) : (
    <div className="block md:flex flex-col justify-center items-center content-container p-4">
      <div className="w-full sm:w-80">
        <Typography as="h2" size="2xl">
          Painting upload
        </Typography>
        <div className="mb-4">
          {selectedImage ? (
            <div>
              <div className="relative w-full h-60">
                <Cropper
                  image={selectedImage}
                  aspect={1 / 1}
                  crop={crop}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="text-right mt-2">
                <Button
                  size="sm"
                  color="transparent"
                  className="ml-auto"
                  onClick={() => setSelectedImage(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <FileInput
              accept="image/png"
              maxFiles={1}
              label="Painting image"
              onSelectFiles={handleOnSelectFile}
              onDeleteFile={() => {}}
            />
          )}
        </div>
        <ControlledInput
          className="mb-4"
          control={control}
          name="designerName"
          input={Input}
          inputProps={{
            label: "Designer name",
            placeholder: "Painted by",
            disabled: isSubmitting,
            className: "w-full",
          }}
          rules={{
            required: "Designer name is required",
            maxLength: {
              value: 20,
              message: "Should be lower then 15 characters",
            },
            validate: (value) =>
              !(value as string).includes(" ") || "Spaces are not allowed",
          }}
        />
        <ControlledInput
          className="mb-4"
          control={control}
          name="monId"
          input={SearchableSelect}
          inputProps={{
            label: "Mon",
            items: mons!.map((mon) => ({
              value: mon.id,
              displayValue: `${mon.id}-${getLocaleProperty(mon, "name")}`,
            })),
            placeholder: "Select a mon",
            disabled: isSubmitting,
            className: "w-full",
          }}
          rules={{ required: "A mon should be selected" }}
        />
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
            disabled={!formState.isValid}
            onClick={submitForm}
            color="primary"
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaintingUpload;
