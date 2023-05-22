import '../date-interval/date-interval.scss';
import 'react-calendar-datetime-picker/dist/index.css';

import { DatePickerProps, DtCalendarDate } from './date-picker.model';
import { toDtCalendarDate, toTimestamp } from './date-picker.utils';

import { DtCalendar } from 'react-calendar-datetime-picker';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useState } from 'react';

export function KsDatePicker({ initialTimestamp, onChange }: DatePickerProps) {
  const [initValue] = useState<DtCalendarDate>(() => {
    if (!isNilOrEmpty(initialTimestamp)) {
      return toDtCalendarDate(initialTimestamp);
    }
  });

  function handleCalendarDateSelect(calendarDate: DtCalendarDate) {
    onChange(toTimestamp(calendarDate));
  }

  return (
    <DtCalendar
      daysClass="custom-days"
      headerClass="custom-header"
      initValue={initValue}
      inputClass="custom-input"
      onChange={handleCalendarDateSelect}
      todayBtn
      type={'single'}
      withTime
    />
  );
}
