export function parseNumberList(input: string): number[] | null {
  if (!input.trim()) return null;
  const parts = input.split(/[,\s]+/).filter(Boolean);
  const nums = parts.map((value) => Number(value));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}
