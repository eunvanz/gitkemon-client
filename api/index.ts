import { User } from "../types";
import requester from "./requester";
import API_URL from "./urls";

/**
 * github 로그인 후 발급받은 코드로 로그인 처리를 하고 유저객체를 얻어온다.
 * @param code github 로그인 후 발급받은 코드
 * @returns 유저객체
 */
const exchangeGithubCode = async (code: string) => {
  const { data } = await requester.post<User>(API_URL.USERS__LOGIN, { code });
  return data;
};

/**
 * 쿠키에 존재하는 토큰으로 로그인 시도
 * @returns User
 */
const loginWithToken = async (token?: string) => {
  const { data } = await requester.post<User | undefined>(
    API_URL.USERS__LOGIN_WITH_TOKEN,
    { token },
  );
  return data;
};

/**
 * 로그아웃 수행
 */
const logout = async () => {
  return await requester.post<void>(API_URL.USERS__LOGOUT);
};

const api = {
  exchangeGithubCode,
  loginWithToken,
  logout,
};

export default api;
