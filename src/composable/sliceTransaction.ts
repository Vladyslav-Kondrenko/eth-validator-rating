export function sliceTransaction( transaction:string ):string {
  return !transaction || transaction.length < 16
    ? transaction
    : transaction.slice(0, 4) + "..." + transaction.slice(-4);
}