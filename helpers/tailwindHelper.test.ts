import { getCalculatedClassName } from "./tailwindHelpers";

describe("getCalculatedClassName", () => {
  [
    {
      given: ["blue-500", 100],
      expected: "blue-600",
    },
    {
      given: ["blue-500", -100],
      expected: "blue-400",
    },
  ].forEach(({ given, expected }) => {
    it(`${given[0]}, ${given[1]}이 주어졌을 때 ${expected}가 리턴된다.`, () => {
      expect(getCalculatedClassName(...(given as [string, number]))).toBe(expected);
    });
  });
});
