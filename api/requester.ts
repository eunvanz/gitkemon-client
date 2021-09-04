import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_HOST,
});
instance.defaults.withCredentials = true;
instance.defaults.timeout = 15_000;

export default instance;
