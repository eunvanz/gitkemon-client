import { useRouter } from "next/router";
import ROUTES from "~/paths";
import { PokeBallType, User } from "~/types";
import HuntResultComponent, { HuntResultProps } from "../../components/HuntResult";

export interface HuntResultViewProps
  extends Omit<HuntResultProps, "pokeBallType" | "result" | "user"> {
  pokeBallType?: PokeBallType;
  user?: User;
}

const HuntResult: React.FC<HuntResultViewProps> = (props) => {
  const router = useRouter();

  if (!props.pokeBallType || !props.user) {
    router.replace(ROUTES.HOME);
  }

  if (props.pokeBallType && props.user) {
    return <HuntResultComponent {...(props as HuntResultProps)} />;
  } else {
    return null;
  }
};

export default HuntResult;
