import Head from "next/head";
import withBaseLayout from "~/hocs/withBaseLayout";
import Workshop from "./Workshop.view";
import useWorkshopProps from "./useWorkshopProps";

const WorkshopPage: React.FC<void> = () => {
  const props = useWorkshopProps();

  return (
    <>
      <Head>
        <title>Workshop - Gitkémon</title>
      </Head>
      <Workshop {...props} />
    </>
  );
};

export default withBaseLayout(WorkshopPage);
