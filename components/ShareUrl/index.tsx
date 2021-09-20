import ShareUrl from "./ShareUrl";
import useShareUrlProps from "./useShareUrlProps";

const ShareUrlContainer: React.FC<{}> = () => {
  const props = useShareUrlProps();

  return <ShareUrl {...props} />;
};

export default ShareUrlContainer;
