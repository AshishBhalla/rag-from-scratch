// This is Manhattan Distance
const similarity = (a: number[], b: number[]): number => {
  const len = Math.min(a.length, b.length);
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimensions");
  }
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += Math.abs(a[i]! - b[i]!);
  }
  return sum;
};

console.log(similarity([1, 2, 3], [20, -30, 10]));
