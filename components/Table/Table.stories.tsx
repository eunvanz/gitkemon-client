import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockCollectionRanking from "~/api/mocks/collectionRanking";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import { Collection } from "~/types";
import MonTypeBadge from "../MonTypeBadge";
import Table from "./Table";

export default {
  title: "components/Table",
  component: Table,
  args: {
    dataSource: mockCollectionRanking.total.items.map((item, index) => ({
      ...item,
      rank: index + 1,
      key: index,
    })),
    columns: [
      {
        title: "rank",
        dataIndex: "rank",
      },
      {
        title: "name",
        dataIndex: "name",
        render: (data: Collection) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              {/* eslint-disable-next-line */}
              <img className="h-10 w-10" src={data.monImageUrl} alt="" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{data.name}</div>
            </div>
          </div>
        ),
      },
      {
        title: "user",
        dataIndex: "__user__",
        key: "user",
        render: (data: Collection) => data.__user__!.nickname,
      },
      {
        title: "type",
        dataIndex: "firstType",
        render: (data: Collection) => (
          <div className="flex items-center">
            <MonTypeBadge type={data.firstType} />
            {data.secondType && <MonTypeBadge type={data.secondType} />}
          </div>
        ),
      },
    ],
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const 기본 = createStoryComponent(Template);
