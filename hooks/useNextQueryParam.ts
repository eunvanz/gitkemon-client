import { useMemo } from "react";
import { useRouter } from "next/router";

export const useNextQueryParams = (): { [key: string]: string } => {
  const router = useRouter();
  const value = useMemo(() => {
    // @see https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const queryParamsStr = router.asPath.split("?").slice(1).join("");
    console.log("===== queryParamsStr", queryParamsStr);
    const urlSearchParams = new URLSearchParams(queryParamsStr);
    console.log("===== urlSearchParams", urlSearchParams);
    // the first key might be in the shape "/assets?foobar", we must change to "foobar"
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log("===== params", params);
    return params;
  }, [router.asPath]);

  return value;
};
