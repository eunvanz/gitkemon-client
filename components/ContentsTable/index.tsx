import ContentsTable from "./ContentsTable";
import useContentsTableProps, {
  ContentsTableContainerProps,
} from "./useContentsTableProps";

const ContentsTableContainer = (containerProps: ContentsTableContainerProps) => {
  const props = useContentsTableProps(containerProps);

  return <ContentsTable {...props} />;
};

export default ContentsTableContainer;
