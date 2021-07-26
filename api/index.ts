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

/**
 * 쿠키에 존재하는 토큰으로 로그인 시도
 * @returns User
 */
const loginWithToken = async () => {
  const { data } = await requester.post<User | undefined>(
    "users/login-with-token"
  );
  return data;
};

/**
 * 로그아웃 수행
 */
const logout = async () => {
  return await requester.post<void>("users/logout");
};

const api = {
  exchangeGithubCode,
  loginWithToken,
  logout,
};

export default api;
