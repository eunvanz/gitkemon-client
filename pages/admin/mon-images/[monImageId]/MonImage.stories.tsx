import { useCallback, useState } from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import allMons from "~/api/mocks/allMons";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonImage from "./MonImage.view";

export default {
  title: "pages/admin/몬스터 이미지/등록 및 수정",
  component: MonImage,
  args: {
    mons: allMons,
  },
} as ComponentMeta<typeof MonImage>;

const Template: ComponentStory<typeof MonImage> = (args) => <MonImage {...args} />;

export const 기본 = createStoryComponent(Template);

export const 컴포넌트 = () => {
  const mons = allMons;

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const onSelectImageFile = useCallback((file: File) => {
    setImageFile(file);
  }, []);

  const onDeleteImageFile = useCallback(() => {
    setImageFile(undefined);
  }, []);

  const onSubmit = useCallback((values) => {
    console.log("onSubmit", values);
  }, []);

  const onNavigateToList = useCallback(() => {
    console.log("onNavigateToList");
  }, []);

  const onSelectMon = useCallback((monId: number) => {
    console.log("onSelectMon", monId);
  }, []);

  return (
    <MonImage
      mons={mons}
      imageFile={imageFile}
      onSelectImageFile={onSelectImageFile}
      onDeleteImageFile={onDeleteImageFile}
      isSubmitting={false}
      onSubmit={onSubmit}
      onNavigateToList={onNavigateToList}
      isLoading={false}
      onSelectMon={onSelectMon}
    />
  );
};
