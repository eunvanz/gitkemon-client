import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollections from "~/api/mocks/collection";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import EvolutionCard from "./EvolutionCard";

export default {
  title: "components/EvolutionCard",
  component: EvolutionCard,
  args: {
    evolveMon: mockCollections.collections[10],
    result: mockCollections.huntResultNew[0],
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof EvolutionCard>;

const Template: ComponentStory<typeof EvolutionCard> = (args) => (
  <EvolutionCard {...args} />
);

export const 기본 = createStoryComponent(Template);
