import { Translate } from '@kleeen/core-react';
import { FormField } from '../form-fields/components';
import { PCPRegistrationFormElementInputs, PCPRegistrationFormProps } from './pcp-registration-form.model';

export const personalInfoFields: FormField<PCPRegistrationFormProps>[] = [
  {
    helperTextTestId: PCPRegistrationFormElementInputs.FirstNameHelperText,
    label: <Translate id={'pcpRegistration.fields.first.name.label'} />,
    name: 'firstName',
    testId: PCPRegistrationFormElementInputs.FirstNameInput,
    type: 'string',
    size: 4,
  },
  {
    helperTextTestId: PCPRegistrationFormElementInputs.LastNameHelperText,
    label: <Translate id={'pcpRegistration.fields.last.name.label'} />,
    name: 'lastName',
    testId: PCPRegistrationFormElementInputs.LastNameInput,
    type: 'string',
    size: 4,
  },
  {
    helperTextTestId: PCPRegistrationFormElementInputs.LastNameHelperText,
    label: <Translate id={'pcpRegistration.fields.title.label'} />,
    name: 'title',
    testId: PCPRegistrationFormElementInputs.LastNameInput,
    type: 'string',
    size: 2,
  },
];

export const emailField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.EmailHelperText,
  label: <Translate id={'pcpRegistration.fields.email.field.label'} />,
  name: 'email',
  testId: PCPRegistrationFormElementInputs.EmailInput,
  type: 'string',
};

export const cellularNumberField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.CellularNumberHelperText,
  label: <Translate id={'pcpRegistration.fields.cellular.number.field.label'} />,
  name: 'cellularNumber',
  testId: PCPRegistrationFormElementInputs.CellularNumberInput,
  type: 'string',
};

export const workNumberField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.WorkNumberHelperText,
  label: <Translate id={'pcpRegistration.fields.work.number.label'} />,
  name: 'workNumber',
  testId: PCPRegistrationFormElementInputs.WorkNumberInput,
  type: 'string',
};

export const officeDaysField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.OfficeDaysHelperText,
  label: <Translate id={'pcpRegistration.fields.office.days.field.label'} />,
  name: 'officeDays',
  testId: PCPRegistrationFormElementInputs.OfficeHoursInput,
  type: 'string',
};

export const officeHoursField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.OfficeHoursHelperText,
  label: <Translate id={'pcpRegistration.fields.office.hours.field.label'} />,
  name: 'officeHours',
  testId: PCPRegistrationFormElementInputs.OfficeHoursInput,
  type: 'string',
};

export const insurancePlansAcceptedField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.InsurancePlansAcceptedHelperText,
  label: <Translate id={'pcpRegistration.fields.insurance.plans.accepted.field.label'} />,
  name: 'insurancePlansAccepted',
  testId: PCPRegistrationFormElementInputs.InsurancePlansAcceptedInput,
  type: 'boolean',
};

export const BasicFeeField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.BasicFeeHelperText,
  label: <Translate id={'pcpRegistration.fields.basic.fee.field.label'} />,
  name: 'basicFee',
  testId: PCPRegistrationFormElementInputs.BasicFeeInput,
  type: 'number',
};

export const SpecialistFeeField: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.SpecialistFeeHelperText,
  label: <Translate id={'pcpRegistration.fields.specialist.fee.field.label'} />,
  name: 'specialistFee',
  testId: PCPRegistrationFormElementInputs.SpecialistFeeInput,
  type: 'number',
};

export const MedicareAccepted: FormField<PCPRegistrationFormProps> = {
  helperTextTestId: PCPRegistrationFormElementInputs.MedicareAcceptedHelperText,
  label: <Translate id={'pcpRegistration.fields.medicare.accepted.field.label'} />,
  name: 'medicareAccepted',
  testId: PCPRegistrationFormElementInputs.MedicareAcceptedInput,
  type: 'boolean',
};
