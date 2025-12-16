export function calculateAverage(values: number[]) {
  if (values.length === 0) return null;
  const sum = values.reduce((acc, rating) => acc + rating, 0);
  return (sum / values.length) as number | null;
}
