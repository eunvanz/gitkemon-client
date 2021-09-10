import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopProgressBar from "./TopProgressBar";
import useTopProgressBarProps from "./useTopProgressBarProps";

const TopProgressBarContainer: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleStop = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router, setIsLoading]);

  const props = useTopProgressBarProps({ isAnimating: isLoading });

  return <TopProgressBar {...props} />;
};

export default TopProgressBarContainer;
