import MonImage from "./MonImage.view";
import useMonImageProps from "./useMonImageProps";

const MonImagePage: React.FC<void> = () => {
  const props = useMonImageProps();

  return <MonImage {...props} />;
};

export default MonImagePage;
