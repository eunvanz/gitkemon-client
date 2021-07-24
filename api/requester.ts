import axios, { AxiosError } from "axios";
import router from "next/router";

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
    const { response, code } = error;
    if (response) {
      const { status } = response;
      switch (status) {
        case 401:
          router.push("sign-in");
      }
    }
  }
);

export default instance;
