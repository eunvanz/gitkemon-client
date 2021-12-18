import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import useActiveMonsQuery from "~/queries/useActiveMonsQuery";
import useInactiveMonsQuery from "~/queries/useInactiveMonsQuery";
import useMonsQuery from "~/queries/useMonsQuery";
import { MonFilter, MonsProps } from "./Mons.view";

const useMonsProps: () => MonsProps = () => {
  const { data: allMons, refetch: refetchAllMons } = useMonsQuery();
  const { data: activeMons, refetch: refetchActiveMons } = useActiveMonsQuery({
    enabled: false,
  });
  const { data: inactiveMons, refetch: refetchInactiveMons } = useInactiveMonsQuery({
    enabled: false,
  });

  const [monFilter, setMonFilter] = useState<MonFilter>("all");

  const router = useRouter();

  const mons = useMemo(() => {
    switch (monFilter) {
      case "all":
        return allMons;
      case "active":
        return activeMons;
      case "inactive":
        return inactiveMons;
    }
  }, [activeMons, allMons, inactiveMons, monFilter]);

  const onEdit = useCallback(
    (id: number) => {
      router.push(`${ROUTES.ADMIN__MONS}/${id}`);
    },
    [router],
  );

  const onChangeMonFilter = useCallback(
    (filter: MonFilter) => {
      setMonFilter(filter);
      switch (filter) {
        case "all":
          refetchAllMons();
          break;
        case "active":
          refetchActiveMons();
          break;
        case "inactive":
          refetchInactiveMons();
          break;
      }
    },
    [refetchActiveMons, refetchAllMons, refetchInactiveMons],
  );

  return {
    mons,
    onEdit,
    onChangeMonFilter,
    monFilter,
  };
};

export default useMonsProps;
