export function toQueryParams(match: string): URLSearchParams {
  const queryString = match.length > 1 && match.startsWith('?') ? match.substring(1) : match;
  return new URLSearchParams(queryString);
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
