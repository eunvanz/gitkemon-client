import { compileUrlWithParams } from "../helpers/commonHelpers";
import { MonFormValues } from "../pages/admin/mons/[monId]/Mon.view";
import {
  Payback,
  Mon,
  MonImage,
  MonImageSearchCondition,
  User,
  Collection,
  PokeBallType,
  HuntResponse,
  HuntResult,
  EvolveMonDto,
  MonTier,
  ContentType,
  PageRequestOptions,
  Pageable,
  Painting,
} from "../types";
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
  const res = await requester.post<User>(API_URL.USERS__REFRESH, {
    token,
  });
  return res ? res.data : null;
};

const getUser = async (userId: string) => {
  const { data } = await requester.get<User>(`${API_URL.USERS}/${userId}`);
  return data;
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
 * MonImage를 검색
 * @param condition
 * @param value
 * @returns MonImage[]
 */
const getMonImages = async (condition: MonImageSearchCondition, value: string) => {
  const { data } = await requester.get<MonImage[]>(API_URL.MON_IMAGES, {
    params: { condition, value },
  });
  return data;
};

/**
 * 전체 포켓몬 조회
 */
const getAllMons = async () => {
  const { data } = await requester.get<Mon[]>(API_URL.MONS);
  return data;
};

/**
 * id로 포켓몬 조회
 * @param id mon id
 * @returns Mon
 */
const getMonById = async (id: number) => {
  const { data } = await requester.get<Mon>(`${API_URL.MONS}/${id}`);
  return data;
};

const postMon = async (mon: MonFormValues) => {
  await requester.post(API_URL.MONS, mon);
};

/**
 * 전체 포켓몬 조회 (+이미지 조인)
 */
const getAllMonsWithImages = async () => {
  const { data } = await requester.get<Mon[]>(API_URL.MONS__WITH_IMAGES);
  return data;
};

export interface CreateMonImageDto {
  file: File;
  monId: number;
  designerId?: string;
  designerName: string;
}
/**
 * 몬 이미지 저장
 * @param monImage
 */
const postMonImage = async (monImage: CreateMonImageDto) => {
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

export type UpdateMonImageDto = Partial<CreateMonImageDto>;
const patchMonImage = async (monImageId: number, monImage: UpdateMonImageDto) => {
  const formData = new FormData();
  monImage.file && formData.append("file", monImage.file);
  monImage.monId && formData.append("monId", monImage.monId.toString());
  monImage.designerId && formData.append("designerId", monImage.designerId.toString());
  monImage.designerName && formData.append("designerName", monImage.designerName);
  await requester.patch<void>(`${API_URL.MON_IMAGES}/${monImageId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 몬스터 이미지 삭제
 * @param monImageId
 */
const deleteMonImage = async (monImageId: number) => {
  await requester.delete(`${API_URL.MON_IMAGES}/${monImageId}`);
};

export interface UpdateMonDto {
  order?: number | null;
  name?: string | null;
  nameKo?: string | null;
  nameJa?: string | null;
  nameZh?: string | null;
  description?: string | null;
  descriptionKo?: string | null;
  descriptionJa?: string | null;
  descriptionZh?: string | null;
  firstType?: string | null;
  secondType?: string | null;
  height?: number | null;
  weight?: number | null;
  tier?: MonTier | null;
  evolutionLevel?: number | null;
  hp?: number | null;
  attack?: number | null;
  defense?: number | null;
  specialAttack?: number | null;
  specialDefense?: number | null;
  speed?: number | null;
  evolveFromId?: number | null;
  colPoint?: number | null;
}
/**
 * 몬 업데이트
 * @param monId
 * @param mon
 */
const patchMon = async (monId: number, mon: UpdateMonDto) => {
  await requester.patch<void>(`${API_URL.MONS}/${monId}`, mon);
};

/**
 * 마지막 기부일 이후의 컨트리뷰션 조회
 * @returns contributions
 */
const getAvailableContributions = async (accessToken?: string) => {
  const { data } = await requester.get<number>(
    API_URL.USERS__AVAILABLE_CONTRIBUTIONS,
    accessToken
      ? {
          headers: {
            "x-gkm-access-token": accessToken,
          },
        }
      : undefined,
  );
  return data;
};

/**
 * 기부 실행
 */
const postPaybacks = async () => {
  const { data } = await requester.post<Payback>(API_URL.DONATIONS);
  return data;
};

export interface HuntDto {
  pokeBallType: PokeBallType;
  amount: number;
}
const hunt = async (huntDto: HuntDto) => {
  const { data } = await requester.post<HuntResponse>(API_URL.COLLECTIONS__HUNT, huntDto);
  return data;
};

const getCollection = async (id: number) => {
  const { data } = await requester.get<Collection>(`${API_URL.COLLECTIONS}/${id}`);
  return data;
};

const getUserCollections = async (userId: string) => {
  const { data } = await requester.get<Collection[]>(
    `${API_URL.COLLECTIONS__USER}/${userId}`,
  );
  return data;
};

const getActiveMons = async () => {
  const { data } = await requester.get<Mon[]>(API_URL.MONS__ACTIVE);
  return data;
};

const getInactiveMons = async () => {
  const { data } = await requester.get<Mon[]>(API_URL.MONS__INACTIVE);
  return data;
};

const evolve = async (evolveMonDto: EvolveMonDto) => {
  const { data } = await requester.post<HuntResult>(
    API_URL.COLLECTIONS__EVOLVE,
    evolveMonDto,
  );
  return data;
};

const getNextMons = async (monId: number) => {
  const { data } = await requester.get<Mon[]>(
    compileUrlWithParams(API_URL.MONS__NEXT, { monId }),
  );
  return data;
};

const blend = async (collectionIds: number[]) => {
  const { data } = await requester.post<HuntResult>(API_URL.COLLECTIONS__BLEND, {
    collectionIds,
  });
  return data;
};

export interface CreatePaintingDto {
  designerName: string;
  monId: number;
  file: File;
}
const postPainting = async ({ designerName, monId, file }: CreatePaintingDto) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("monId", monId.toString());
  formData.append("designerName", designerName);
  await requester.post(API_URL.PAINTINGS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getPaintingList = async (pageOptions: PageRequestOptions) => {
  const { data } = await requester.get<Pageable<Painting>>(API_URL.PAINTINGS, {
    params: pageOptions,
  });
  return data;
};

export interface UpdatePaintingDto {
  designerName?: string;
  monId?: number;
  file?: File;
  paintingId: number;
}
const patchPainting = async ({
  designerName,
  monId,
  file,
  paintingId,
}: UpdatePaintingDto) => {
  const formData = new FormData();
  designerName && formData.append("designerName", designerName);
  monId && formData.append("monId", monId.toString());
  file && formData.append("file", file);
  await requester.patch(`${API_URL.PAINTINGS}/${paintingId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getPainting = async (paintingId: number) => {
  const { data } = await requester.get<Painting>(`${API_URL.PAINTINGS}/${paintingId}`);
  return data;
};

const deletePainting = async (paintingId: number) => {
  await requester.delete(`${API_URL.PAINTINGS}/${paintingId}`);
};

export interface CreateLikeDto {
  contentType: ContentType;
  contentId: number;
}
const postLike = async (createLikeDto: CreateLikeDto) => {
  await requester.post(API_URL.LIKES, createLikeDto);
};

export type UnlikeDto = CreateLikeDto;
const postUnlike = async (unlikeDto: UnlikeDto) => {
  await requester.post(API_URL.LIKES_UNLIKE, unlikeDto);
};

const getMonRanking = async (pageOptions: PageRequestOptions) => {
  const { data } = await requester.get<Pageable<Collection>>(API_URL.COLLECTIONS__RANK, {
    params: pageOptions,
  });
  return data;
};

const api = {
  exchangeGithubCode,
  loginWithToken,
  logout,
  getMonImage,
  getAllMons,
  getAllMonsWithImages,
  postMonImage,
  patchMon,
  getMonImages,
  deleteMonImage,
  patchMonImage,
  getAvailableContributions,
  postPaybacks,
  hunt,
  getCollection,
  getMonById,
  getUserCollections,
  getActiveMons,
  getInactiveMons,
  postMon,
  getUser,
  evolve,
  getNextMons,
  blend,
  postPainting,
  getPaintingList,
  postLike,
  postUnlike,
  patchPainting,
  deletePainting,
  getPainting,
  getMonRanking,
};

export default api;
