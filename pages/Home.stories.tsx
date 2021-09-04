import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withMockRouter from "~/.storybook/decorators/withMockRouter";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockPayback from "~/api/mocks/payback";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Home from "./Home.view";

export default {
  title: "pages/Home",
  component: Home,
  args: {
    user: mockUsers.user,
    availableContributions: 24,
    lastPayback: mockPayback.payback,
  },
  decorators: [withTestProvider, withMockRouter()],
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Default = createStoryComponent(Template);
