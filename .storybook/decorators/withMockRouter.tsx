import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/dist/next-server/lib/router/router";
import { useState } from "react";
import { action } from "@storybook/addon-actions";

const withMockRouter = (partialBaseRouter?: Partial<NextRouter>) => (
  Story: any
) => {
  const [pathname, setPathname] = useState("/");

  // @ts-ignore
  const mockRouter: NextRouter = {
    route: "/",
    pathname,
    query: {},
    asPath: pathname,
    basePath: "/",
    isLocaleDomain: true,
    push: async (newPathname: string) => {
      action("push")(newPathname);
      setPathname(newPathname);
      return true;
    },
    replace: async (newPathname: string) => {
      action("replace")(newPathname);
      setPathname(newPathname);
      return true;
    },
    back: () => {
      action("back")();
    },
    prefetch: async (url: string) => {
      action("prefech")(url);
    },
    reload: () => {
      action("reload")();
    },
    beforePopState: () => {},
    ...partialBaseRouter,
  };

  return (
    <RouterContext.Provider value={mockRouter}>
      <Story />
    </RouterContext.Provider>
  );
};

export default withMockRouter;
