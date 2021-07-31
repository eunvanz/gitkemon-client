/**
 * 숫자가 들어간 클래스명을 2번째 파라미터의 숫자로 연산하여 리턴
 * @param className 숫자가 들어간 클래스명
 * @param amount 조정할 숫자
 * @returns 조정할 숫자로 연산된 클래스명
 */
export const getCalculatedClassName = (className: string, amount: number) => {
  const number = className.match(/\d+/)?.[0];
  if (number) {
    const replacedNumber = Number(number) + amount;
    return className.replace(number, replacedNumber.toString());
  } else {
    return className;
  }
};
