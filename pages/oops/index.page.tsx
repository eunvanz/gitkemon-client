import Head from "next/head";
import Oops from "./Oops.view";

const OopsPage: React.FC<void> = () => {
  return (
    <>
      <Head>
        <title>Oops! - Gitkémon</title>
      </Head>
      <Oops />
    </>
  );
};

export default OopsPage;
