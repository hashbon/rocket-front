export function isNumeric(value: any): boolean {
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(parseFloat(value)) && isFinite(value);
}
