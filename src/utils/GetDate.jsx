import { format } from 'date-fns';

export function FormatDateTime(date, type = 'yyyy-MM-dd HH:mm') {
  return format(new Date(date), type);
}

export function FormatDate(date, type = 'yyyy-MM-dd') {
  return format(new Date(date), type);
}