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
