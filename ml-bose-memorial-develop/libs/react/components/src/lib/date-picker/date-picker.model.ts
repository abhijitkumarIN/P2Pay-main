export interface DtCalendarDate {
  day: number;
  hour?: number;
  minute?: number;
  month: number;
  year: number;
}

export interface DatePickerProps {
  initialTimestamp?: number;
  onChange: (timestamp: number) => void;
}

export type DatePickerInputProps = DatePickerProps;
