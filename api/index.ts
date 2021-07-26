import { User } from "../types";
import requester from "./requester";

/**
 * github 로그인 후 발급받은 코드로 로그인 처리를 하고 유저객체를 얻어온다.
 * @param code github 로그인 후 발급받은 코드
 * @returns 유저객체
 */
const exchangeGithubCode = async (code: string) => {
  const { data } = await requester.post<User>("users/login", { code });
  return data;
};

const api = {
  exchangeGithubCode,
};

export default api;
