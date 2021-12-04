export function getRandomPage(max: number) {
  return Math.floor(Math.random() * (max - 1 + 1)) + 1;
}
