import { useCallback, useState } from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import FileInput from "./FileInput";

export default {
  title: "components/FileInput",
  component: FileInput,
  args: {
    label: "Mon image",
    hint: "transparent 250x250 PNG file only",
    maxFiles: 2,
  },
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => <FileInput {...args} />;

export const 기본 = createStoryComponent(Template);

export const 컨테이너 = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onSelectFiles = useCallback(
    (files: File[]) => {
      setSelectedFiles([...selectedFiles, ...files]);
    },
    [selectedFiles],
  );

  const onDeleteFile = useCallback(
    (index: number) => {
      setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    },
    [selectedFiles],
  );

  return (
    <FileInput
      label="Files"
      maxFiles={5}
      accept="image/png"
      selectedFiles={selectedFiles}
      onSelectFiles={onSelectFiles}
      onDeleteFile={onDeleteFile}
    />
  );
};
