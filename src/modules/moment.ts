export function formatddmmyyyy(date: Date, split: string = '/') {
  let day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  if (day.toString().length === 1) {
    day = ('0' + day) as any;
  }
  if (month.toString().length === 1) {
    month = ('0' + month) as any;
  }
  return day + split + month + split + year;
}
export function formatyyyymmdd(date: Date, split: string = '/') {
  let day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  if (day.toString().length === 1) {
    day = ('0' + day) as any;
  }
  if (month.toString().length === 1) {
    month = ('0' + month) as any;
  }
  return year + split + month + split + day;
}