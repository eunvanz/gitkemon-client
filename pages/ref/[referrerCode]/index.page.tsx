import { useEffect } from "react";
import { useRouter } from "next/router";
import ROUTES from "~/paths";

const RefPage: React.FC<void> = () => {
  const router = useRouter();

  const { referrerCode } = router.query as { referrerCode: string };

  useEffect(() => {
    if (referrerCode) {
      localStorage.setItem("referrerCode", referrerCode);
      router.replace(ROUTES.HOME);
    }
  }, [referrerCode, router]);

  return null;
};

export default RefPage;
