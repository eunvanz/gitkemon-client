import { RefObject, useMemo } from "react";
import dayjs from "dayjs";
import { ResponsiveContainer, XAxis, Tooltip, ComposedChart, Bar, Area } from "recharts";
import { colorHashes } from "~/constants/styles";
import { PaybackLog } from "~/types";

export interface ContributionChartProps {
  paybackLogs: PaybackLog[];
  containerRef: RefObject<HTMLDivElement>;
  type: "total" | "daily";
}

const ContributionChart: React.FC<ContributionChartProps> = ({
  paybackLogs,
  containerRef,
  type,
}) => {
  const containerInfo = containerRef.current?.getClientRects()[0];

  const data = useMemo(() => {
    const filledPaybackLogs = paybackLogs.reduce((prev: PaybackLog[], item, index) => {
      if (index === 0) {
        return [item];
      }
      const newArray = [...prev];
      const fillEmptyDates = () => {
        const lastItem = newArray[newArray.length - 1] as PaybackLog;
        const nextDate = dayjs(lastItem.date).add(1, "day").format("YYYY-MM-DD");
        if (item.date !== nextDate) {
          newArray.push({
            date: nextDate,
            totalContributions: lastItem.totalContributions,
          });
          fillEmptyDates();
        } else {
          newArray.push(item);
        }
      };
      fillEmptyDates();
      return newArray;
    }, []);
    return filledPaybackLogs.map((item, index) => ({
      date: item.date,
      "Total contributions": item.totalContributions,
      "Daily contributions":
        index > 0
          ? item.totalContributions - filledPaybackLogs[index - 1].totalContributions
          : 0,
    }));
  }, [paybackLogs]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={containerInfo?.width}
        height={containerInfo?.height}
        data={data}
      >
        <XAxis dataKey="date" hide />
        <Tooltip />
        {type === "total" ? (
          <Area
            type="monotone"
            dataKey="Total contributions"
            stroke={colorHashes.BUG}
            fill={colorHashes.GRASS}
          />
        ) : (
          <Bar dataKey="Daily contributions" barSize={10} fill={colorHashes.GRASS} />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ContributionChart;
