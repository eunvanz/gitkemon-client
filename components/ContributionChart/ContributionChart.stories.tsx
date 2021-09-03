import { useRef } from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockPayback from "~/api/mocks/payback";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContributionChart from "./ContributionChart";

export default {
  title: "components/ContributionChart",
  component: ContributionChart,
  args: {
    paybackLogs: mockPayback.history,
  },
} as ComponentMeta<typeof ContributionChart>;

const Template: ComponentStory<typeof ContributionChart> = (args) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ width: 500, height: 300 }}>
      <ContributionChart {...args} containerRef={containerRef} />
    </div>
  );
};

export const 기본 = createStoryComponent(Template);
