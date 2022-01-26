// eslint-disable-next-line import/prefer-default-export
export function isDemoMode(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (process.env.NODE_ENV as any) === 'demo';
}
