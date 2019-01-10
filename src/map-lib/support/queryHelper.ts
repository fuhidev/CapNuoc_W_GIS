import * as moment from 'moment/moment';
export function formatDate(date: Date) {
  return moment(date).format('YYYY-MM-DD')
}