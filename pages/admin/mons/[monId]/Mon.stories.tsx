import type { ComponentStory, ComponentMeta } from "@storybook/react";
import allMons from "../../../../api/mocks/allMons";
import { createStoryComponent } from "../../../../helpers/storybookHelpers";
import Mon from "./Mon.view";

export default {
  title: "pages/admin/포켓몬/등록 및 수정",
  component: Mon,
  args: {
    mons: allMons,
  },
} as ComponentMeta<typeof Mon>;

const Template: ComponentStory<typeof Mon> = (args) => <Mon {...args} />;

export const 등록 = createStoryComponent(Template);

export const 수정 = createStoryComponent(Template, {
  defaultFormValues: allMons[0],
});
