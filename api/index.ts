import { Mon, MonImage, User } from "../types";
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
  const res = await requester.post<User>(API_URL.USERS__LOGIN_WITH_TOKEN, {
    token,
  });
  return res ? res.data : null;
};

/**
 * 로그아웃 수행
 */
const logout = async () => {
  await requester.post<void>(API_URL.USERS__LOGOUT);
};

/**
 * MonImage를 아이디로 조회
 * @param monImageId 몬 이미지 아이디
 * @returns MonImage
 */
const getMonImage = async (monImageId: number) => {
  const { data } = await requester.get<MonImage>(`${API_URL.MON_IMAGES}/${monImageId}`);
  return data;
};

/**
 * 전체 포켓몬 조회
 */
const getAllMons = async () => {
  const { data } = await requester.get<Mon[]>(API_URL.MONS);
  return data;
};

export interface CreateMonImageDTO {
  file: File;
  monId: number;
  designerId?: string;
  designerName: string;
}
/**
 * 몬 이미지 저장
 * @param monImage
 */
const postMonImage = async (monImage: CreateMonImageDTO) => {
  const formData = new FormData();
  formData.append("file", monImage.file);
  formData.append("monId", monImage.monId.toString());
  monImage.designerId && formData.append("designerId", monImage.designerId.toString());
  formData.append("designerName", monImage.designerName);
  await requester.post<void>(API_URL.MON_IMAGES, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface UpdateMonDTO {
  order?: number;
  name?: string;
  nameKo?: string;
  nameJa?: string;
  nameZh?: string;
  description?: string;
  descriptionKo?: string;
  descriptionJa?: string;
  descriptionZh?: string;
  firstType?: string;
  secondType?: string;
  height?: number;
  weight?: number;
  tier?: "basic" | "special" | "rare" | "s.rare" | "elite" | "legend";
  evolutionLevel?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  specialAttack?: number;
  specialDefense?: number;
  speed?: number;
  evolveFromId?: number;
  colPoint?: number;
}
/**
 * 몬 업데이트
 * @param monId
 * @param mon
 */
const patchMon = async (monId: number, mon: UpdateMonDTO) => {
  await requester.patch<void>(`${API_URL.MONS}/${monId}`, mon);
};

const api = {
  exchangeGithubCode,
  loginWithToken,
  logout,
  getMonImage,
  getAllMons,
  postMonImage,
  patchMon,
};

export default api;
