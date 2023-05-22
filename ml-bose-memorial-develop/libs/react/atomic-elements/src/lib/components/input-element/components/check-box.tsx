import { InputComponentProps } from '@kleeen/types';
import { KsCheckbox } from '@kleeen/react/components';

export function CheckBox({ setValue, value }: InputComponentProps) {
  return (
    <KsCheckbox
      checked={value}
      onChange={(_, newValue: boolean) => {
        setValue(newValue);
      }}
    />
  );
}
