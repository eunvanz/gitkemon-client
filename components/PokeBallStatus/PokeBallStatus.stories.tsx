import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import PokeBallStatus from "./PokeBallStatus";

export default {
  title: "components/PokeBallStatus",
  component: PokeBallStatus,
  args: {
    pokeBall: mockUsers.user.__pokeBall__,
  },
} as ComponentMeta<typeof PokeBallStatus>;

const Template: ComponentStory<typeof PokeBallStatus> = (args) => (
  <PokeBallStatus {...args} />
);

export const Default = createStoryComponent(Template);
