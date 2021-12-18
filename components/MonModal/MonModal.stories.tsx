import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockCollections from "~/api/mocks/collection";
import mockMons from "~/api/mocks/mon";
import { convertCollectionToModalMon } from "~/helpers/projectHelpers";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonModal from "./MonModal";

export default {
  title: "components/MonModal",
  component: MonModal,
  args: {
    mon: mockMons.modalMon,
    isOpen: true,
  },
} as ComponentMeta<typeof MonModal>;

const Template: ComponentStory<typeof MonModal> = (args) => <MonModal {...args} />;

export const 기본 = createStoryComponent(Template);

export const 뒷면 = createStoryComponent(Template, {
  isInitialBack: true,
});

export const 콜렉션 = createStoryComponent(Template, {
  mon: mockMons.modalMonCollection,
});

export const 로딩 = createStoryComponent(Template, {
  mon: undefined,
});

export const 레벨업 = createStoryComponent(Template, {
  mon: convertCollectionToModalMon(mockCollections.huntResultLevelUp[0].newCollection),
  oldMon: convertCollectionToModalMon(
    mockCollections.huntResultLevelUp[0].oldCollection!,
  ),
});
