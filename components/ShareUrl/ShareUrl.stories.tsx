import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ShareUrl from "./ShareUrl";

export default {
  title: "components/ShareUrl",
  component: ShareUrl,
  args: {
    user: mockUsers.user,
  },
} as ComponentMeta<typeof ShareUrl>;

const Template: ComponentStory<typeof ShareUrl> = (args) => <ShareUrl {...args} />;

export const Default = createStoryComponent(Template);
