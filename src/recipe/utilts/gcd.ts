// Find the GCD of two numbers
export const GCD = (a: number, b: number): number => {
  if (!b) return a;
  return GCD(b, a % b);
};

export default GCD;
