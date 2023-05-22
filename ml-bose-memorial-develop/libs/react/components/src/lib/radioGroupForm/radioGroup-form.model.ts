interface IRadioOption {
  id: string;
  value: string;
}

export interface IRadioGroupFormProps {
  onChange: () => void;
  options: IRadioOption[];
  title: string;
  value: string;
}
