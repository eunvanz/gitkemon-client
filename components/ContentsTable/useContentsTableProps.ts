import { getMergedPageData } from "~/helpers/projectHelpers";
import useContentListQuery from "~/queries/useContentListQuery";
import { ContentType } from "~/types";
import { ContentsTableProps } from "./ContentsTable";

export interface ContentsTableContainerProps {
  contentType: ContentType;
  isPreview?: boolean;
}

const useContentsTableProps: (
  props: ContentsTableContainerProps,
) => ContentsTableProps = ({ contentType, isPreview }) => {
  const { data: contentsData, hasNextPage, fetchNextPage } = useContentListQuery({
    type: contentType,
    size: isPreview ? 3 : 20,
  });

  return {
    contents: contentsData ? getMergedPageData(contentsData.pages) : undefined,
    hasNextPage,
    isPreview,
    onFetchNextPage: fetchNextPage,
  };
};

export default useContentsTableProps;
