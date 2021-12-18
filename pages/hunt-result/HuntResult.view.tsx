import { useEffect } from "react";
import { useRouter } from "next/router";
import HuntResultComponent, { HuntResultProps } from "~/components/HuntResult";
import ROUTES from "~/paths";
import { PokeBallType, User } from "~/types";

export interface HuntResultViewProps
  extends Omit<HuntResultProps, "pokeBallType" | "result" | "user"> {
  pokeBallType?: PokeBallType;
  user?: User;
}

const HuntResult: React.FC<HuntResultViewProps> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.pokeBallType || !props.user) {
      router.replace(ROUTES.HOME);
    }
  }, [props.pokeBallType, props.user, router]);

  if (props.pokeBallType && props.user) {
    return <HuntResultComponent {...(props as HuntResultProps)} />;
  } else {
    return null;
  }
};

export default HuntResult;
