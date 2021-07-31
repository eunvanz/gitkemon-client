import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import LineGauge from "./LineGauge";

export default {
  title: "components/LineGauge",
  component: LineGauge,
  args: {
    values: [
      {
        color: "yellow-400",
        value: 40,
      },
      {
        color: "blue-400",
        value: 20,
      },
      {
        color: "pink-400",
        value: 10,
      },
    ],
  },
} as ComponentMeta<typeof LineGauge>;

const Template: ComponentStory<typeof LineGauge> = (args) => <LineGauge {...args} />;

export const 기본 = createStoryComponent(Template);

export const 오버플로우 = createStoryComponent(Template, {
  values: [
    {
      color: "yellow-400",
      value: 40,
    },
    {
      color: "blue-400",
      value: 20,
    },
    {
      color: "pink-400",
      value: 10,
    },
    {
      color: "green-400",
      value: 50,
    },
  ],
});
