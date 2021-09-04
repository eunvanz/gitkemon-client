import axios, { AxiosError } from "axios";
import Dialog from "~/components/Dialog";
import ROUTES from "~/paths";

const handleCommonError = (method?: string, errorMessage?: string) => {
  if (method === "get" || method === undefined) {
    window.location.assign(ROUTES.OOPS);
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
  async (error: AxiosError) => {
    if (!window) return;
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
            if (errorMessage) {
              await Dialog.show({ title: "Error", content: errorMessage });
            }
            window.location.assign(ROUTES.SIGN_IN);
            return;
        }
        handleCommonError(method, errorMessage);
      } else {
        switch (status) {
          case 401:
            window.location.assign(ROUTES.SIGN_IN);
            return;
          case 403:
            await Dialog.show({ title: "Error", content: "You do not have permission." });
            window.location.assign(ROUTES.OOPS);
            return;
        }
        handleCommonError(method);
      }
    }
  },
);

export default instance;
