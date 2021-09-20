import ShareUrl from "./ShareUrl";
import useShareUrlProps from "./useShareUrlProps";

const ShareUrlContainer: React.FC<void> = () => {
  const props = useShareUrlProps();

  return <ShareUrl {...props} />;
};

export default ShareUrlContainer;
