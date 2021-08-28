import xor from "lodash/xor";
import { compile } from "path-to-regexp";

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

/**
 * n과 m 사이 x의 배수 개수를 리턴
 * @param x 배수
 * @param n 구간 시작 숫자
 * @param m 구간 끝 숫자
 * @returns n과 m 사이의 x의 배수 갯수
 */
export const getMultiplesCountBetween = (x: number, n: number, m: number) => {
  let cnt = 0;
  for (let i = n; i <= m; i++) {
    if (i === 0) {
      continue;
    } else if (i % x === 0) {
      cnt++;
    }
  }
  return cnt;
};

export function assertNotEmpty(value: any, message?: string): asserts value {
  if (value === null || value === undefined) {
    throw new Error(message || "Assertion Error: Empty Value");
  }
}

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const isArrayEqual = (arr: any[], arr2: any[]) => {
  return xor(arr, arr2).length === 0;
};

export const compileUrlWithParams = (path: string, params: Object) => {
  return compile(path)(params);
};

export const delayPromise = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
