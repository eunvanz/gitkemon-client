import { action } from "@storybook/addon-actions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import allMons from "~/api/mocks/allMons";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Mons from "./Mons.view";

export default {
  title: "pages/admin/포켓몬/목록",
  component: Mons,
  args: {
    mons: allMons,
    onChangeMonFilter: action("onChangeMonFilter"),
  },
} as ComponentMeta<typeof Mons>;

const Template: ComponentStory<typeof Mons> = (args) => <Mons {...args} />;

export const 기본 = createStoryComponent(Template);
