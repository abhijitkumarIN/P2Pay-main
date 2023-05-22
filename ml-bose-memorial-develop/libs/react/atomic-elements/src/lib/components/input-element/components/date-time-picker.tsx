import { InputComponentProps } from '@kleeen/types';
import { KsDatePickerInput } from '@kleeen/react/components';

export function DateTimePicker({ setValue, value }: InputComponentProps) {
  return <KsDatePickerInput initialTimestamp={value} onChange={setValue} />;
}
