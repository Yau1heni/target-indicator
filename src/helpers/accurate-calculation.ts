export const roundToPrecision = (number: number, precision: number = 1): number =>
  +number.toFixed(precision)

export const accurateSum = (num1: number, num2: number, precision: number = 1): number => {
  const result = num1 + num2

  return roundToPrecision(result, precision)
}
export const accurateSubtract = (num1: number, num2: number, precision: number = 1): number => {
  const result = num1 - num2

  return roundToPrecision(result, precision)
}
