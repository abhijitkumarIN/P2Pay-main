import {
  CheckBox,
  CheckBoxGroup,
  ColorPickerSelect,
  CompositeComponent,
  DateTimePicker,
  FieldTextAutocomplete,
  RadioGroup,
  RelativeDateDropdown,
  SelectTextAutocomplete,
  SwitchField,
  TokenFieldText,
  TokenSelectText,
} from './components';
import { ElementInputType, InputCatalog, InputComponentProps, InputElement, Maybe } from '@kleeen/types';

const inputCatalog: InputCatalog = {
  [ElementInputType.CheckBox]: CheckBox,
  [ElementInputType.CheckGroup]: CheckBoxGroup,
  [ElementInputType.ColorPicker]: ColorPickerSelect,
  [ElementInputType.CompositeComponent]: CompositeComponent,
  [ElementInputType.DateTimeField]: DateTimePicker,
  [ElementInputType.FieldTextAutoComplete]: FieldTextAutocomplete,
  [ElementInputType.RadioGroup]: RadioGroup,
  [ElementInputType.RelativeDateDropdown]: RelativeDateDropdown,
  [ElementInputType.SelectTextAutocomplete]: SelectTextAutocomplete,
  [ElementInputType.Switch]: SwitchField,
  [ElementInputType.TokenFieldText]: TokenFieldText,
  [ElementInputType.TokenSelectText]: TokenSelectText,
  [ElementInputType.UploadImage]: TODO,
};

export function getInputElement(inputComponent: ElementInputType): Maybe<InputElement> {
  return inputCatalog[inputComponent];
}

//#region Private members
function TODO({ element }: InputComponentProps) {
  /* eslint-disable-next-line no-console */
  console.info(`${element} TBD soon`);
  return null;
}
//#endregion
