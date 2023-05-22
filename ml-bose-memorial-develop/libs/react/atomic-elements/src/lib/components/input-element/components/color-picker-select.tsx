import { InputComponentProps } from '@kleeen/types';
import { KsColorPicker } from '@kleeen/react/components';

export function ColorPickerSelect({ formatType, setValue, value }: InputComponentProps) {
  return <KsColorPicker defaultValue={value} handleOnChange={setValue} formatType={formatType} />;
}
