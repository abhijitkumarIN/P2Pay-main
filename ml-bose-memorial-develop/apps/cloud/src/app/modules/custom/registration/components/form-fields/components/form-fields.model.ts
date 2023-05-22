import { Control, FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Keys } from 'react-hook-form/dist/types/path/common';
import { ReactNode } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { SelectProps } from '@material-ui/core/Select';
import { RadioGroupProps } from '@material-ui/core/RadioGroup';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { DonorRegistrationFormProps } from '../../donor-registration-form/donor-registration-form.model';
import { PWIRegistrationFormProps } from '../../pwi-registration-form/pwi-registration-form.model';
import { PCPRegistrationFormProps } from '../../pcp-registration-form/pcp-registration-form.model';

export type FormTextFieldProps = TextFieldProps & {
  control?:
    | Control<DonorRegistrationFormProps, any>
    | Control<PWIRegistrationFormProps, any>
    | Control<PCPRegistrationFormProps, any>;
  fieldError?: FieldError;
  helperText?: string;
  register: UseFormRegisterReturn;
  value?: string;
};

export type FormSelectFieldProps = SelectProps & {
  control?:
    | Control<DonorRegistrationFormProps, any>
    | Control<PWIRegistrationFormProps, any>
    | Control<PCPRegistrationFormProps, any>;
  fieldError?: FieldError;
  options?: { label: string; value: string }[];
  register: UseFormRegisterReturn;
};

export type FormRadioFieldProps = RadioGroupProps & {
  control?:
    | Control<DonorRegistrationFormProps, any>
    | Control<PWIRegistrationFormProps, any>
    | Control<PCPRegistrationFormProps, any>;
  fieldError?: FieldError;
  options: { label: string; value: string }[];
  register: UseFormRegisterReturn;
};

export type FormCheckFieldProps = CheckboxProps & {
  control?:
    | Control<DonorRegistrationFormProps, any>
    | Control<PWIRegistrationFormProps, any>
    | Control<PCPRegistrationFormProps, any>;
  defaultValue?: string[];
  fieldError?: FieldError;
  options: { label: string; value: string }[];
  register: UseFormRegisterReturn;
};

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormField<T> {
  helperTextTestId?: string;
  label: string | JSX.Element;
  name: Keys<T>;
  options?: SelectOption[];
  readOnly?: boolean;
  select?: boolean;
  size?: number;
  testId: string;
  tooltipText?: string | ReactNode;
  type?: string;
}
