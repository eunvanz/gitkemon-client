import axios, { AxiosError } from "axios";
import router from "next/router";
import Dialog from "~/components/Dialog";
import ROUTES from "~/paths";

const handleCommonError = (method?: string, errorMessage?: string) => {
  if (method === "get" || method === undefined) {
    if (window.location.pathname === ROUTES.OOPS) {
      return;
    }
    router.push(ROUTES.OOPS);
  } else {
    Dialog.show({
      title: "Error",
      content: errorMessage || "An unexpected error has occurred. Please retry again.",
    });
  }
};

const instance = axios.create({
  baseURL: process.env.API_HOST,
});
instance.defaults.withCredentials = true;
instance.defaults.timeout = 15_000;

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      const {
        status,
        data,
        config: { method },
      } = response;
      if (data) {
        const { errorCode, errorMessage } = data;
        switch (errorCode) {
          case "LOGIN_REQUIRED":
          case "INVALID_TOKEN":
            if (window.location.pathname === ROUTES.SIGN_IN) {
              return;
            }
            if (errorMessage) {
              Dialog.show({ title: "Error", content: errorMessage });
            }
            router.push(ROUTES.SIGN_IN);
            return;
        }
        handleCommonError(method, errorMessage);
      } else {
        switch (status) {
          case 401:
            if (window.location.pathname === ROUTES.SIGN_IN) {
              return;
            }
            router.push(ROUTES.SIGN_IN);
            return;
          case 403:
            if (window.location.pathname === ROUTES.OOPS) {
              return;
            }
            Dialog.show({ title: "Error", content: "You do not have permission." });
            router.push(ROUTES.OOPS);
            return;
        }
        handleCommonError(method);
      }
    }
  },
);

export default instance;
