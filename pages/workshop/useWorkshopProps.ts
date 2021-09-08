import { useCallback } from "react";
import { useRouter } from "next/router";
import useList from "~/hooks/useList";
import ROUTES from "~/paths";
import usePaintingListQuery from "~/queries/usePaintingListQuery";
import { WorkshopProps } from "./Workshop.view";

const useWorkshopProps: () => WorkshopProps = () => {
  const router = useRouter();

  const { data: paintings, fetchNextPage, hasNextPage } = useList(usePaintingListQuery);

  const onNavigateToUpload = useCallback(() => {
    router.push(`${ROUTES.WORKSHOP}/new`);
  }, [router]);

  return {
    onNavigateToUpload,
    paintings,
    onFetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage || false,
  };
};

export default useWorkshopProps;
