import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ExchangeCode from "./ExchangeCode.view";

export default {
  title: "pages/깃헙코드교환",
  component: ExchangeCode,
  args: {},
} as ComponentMeta<typeof ExchangeCode>;

const Template: ComponentStory<typeof ExchangeCode> = () => <ExchangeCode />;

export const 기본 = createStoryComponent(Template);
