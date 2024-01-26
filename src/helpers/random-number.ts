export function getRandomNumber(max: number): number {
  const randomDecimal = Math.random()
  const randomNumber = Math.ceil(randomDecimal * max)
  return randomNumber
}
