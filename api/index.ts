import requester from "./requester";

const exchangeGithubCode = async (code: string) => {
  return requester.post("users/login", { code });
};

const api = {
  exchangeGithubCode,
};

export default api;
