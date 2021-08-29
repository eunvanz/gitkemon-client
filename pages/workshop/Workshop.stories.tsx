import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockPainting from "~/api/mocks/painting";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Workshop from "./Workshop.view";

export default {
  title: "pages/Workshop",
  component: Workshop,
  args: {
    paintingList: mockPainting.pagedPaintings,
  },
} as ComponentMeta<typeof Workshop>;

const Template: ComponentStory<typeof Workshop> = (args) => <Workshop {...args} />;

export const 기본 = createStoryComponent(Template);
