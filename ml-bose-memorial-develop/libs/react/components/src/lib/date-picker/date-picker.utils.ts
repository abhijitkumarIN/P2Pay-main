import { DtCalendarDate } from './date-picker.model';
import { isNilOrEmpty } from '@kleeen/common/utils';
import moment from 'moment';

export function toDtCalendarDate(timestamp: number): DtCalendarDate {
  const dateAsMoment = moment(timestamp);
  const dateAsObject = dateAsMoment.toObject();
  const pickerDate = {
    year: dateAsObject.years,
    month: dateAsObject.months + 1,
    day: dateAsObject.date,
    hour: dateAsObject.hours,
    minute: dateAsObject.minutes,
  };
  return pickerDate;
}

export function toTimestamp(pickerDate: DtCalendarDate): number {
  if (isNilOrEmpty(pickerDate)) return moment().valueOf();
  const dateAsObject = {
    years: pickerDate.year,
    months: pickerDate.month - 1,
    date: pickerDate.day,
    hours: pickerDate.hour,
    minutes: pickerDate.minute,
  };
  const dateAsMoment = moment(dateAsObject);
  return dateAsMoment.valueOf();
}
