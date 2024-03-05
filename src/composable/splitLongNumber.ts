export function splitLongNumber(number: number):string {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}