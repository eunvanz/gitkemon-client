import xor from "lodash/xor";
import { compile } from "path-to-regexp";

export const convertURLtoFile = async (url: string, extension?: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = extension || url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], `${filename!}${extension ? `.${extension}` : ""}`, metadata);
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

export const convertFileToBase64 = async (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx!.translate(safeArea / 2, safeArea / 2);
  ctx!.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx!.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx!.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx!.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  // As Base64 string
  return canvas.toDataURL("image/png");
}
