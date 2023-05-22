import { Dispatch, SetStateAction } from 'react';

import { Maybe } from '@kleeen/types';
import { Moment } from 'moment';

export type DateProps = Moment;
export interface DatePickerProps {
  from: DateProps;
  to: DateProps;
  relativeDate: string;
}
export interface DatePickerStateObject extends DatePickerProps {
  setFrom: Dispatch<SetStateAction<Maybe<DateProps>>>;
  setRelativeDate: Dispatch<SetStateAction<Maybe<string>>>;
  setTo: Dispatch<SetStateAction<Maybe<DateProps>>>;
}
export interface DatePickerIntervalProps {
  datePickerState: DatePickerStateObject;
  translate?: (e: string) => string;
  isOpen?: boolean;
  isSetOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  handleFilter?: () => void;
}
