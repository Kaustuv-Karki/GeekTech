export const standardDeviation = (numbers) => {
  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
  const squaredDiff = numbers.map((num) => Math.pow(num - mean, 2));
  const sumSquaredDiff = squaredDiff.reduce((acc, val) => acc + val, 0);
  const variance = sumSquaredDiff / numbers.length;
  return Math.sqrt(variance);
};
