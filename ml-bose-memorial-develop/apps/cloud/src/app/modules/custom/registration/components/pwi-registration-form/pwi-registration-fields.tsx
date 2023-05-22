import { Translate } from '@kleeen/core-react';
import { FormField } from '../form-fields/components';
import { PWIRegistrationFormElementInputs, PWIRegistrationFormProps } from './pwi-registration-form.model';

export const personalInfoFields: FormField<PWIRegistrationFormProps>[] = [
  {
    helperTextTestId: PWIRegistrationFormElementInputs.FirstNameHelperText,
    label: <Translate id={'pwiRegistration.fields.first.name.label'} />,
    name: 'firstName',
    testId: PWIRegistrationFormElementInputs.FirstNameInput,
    type: 'string',
  },
  {
    helperTextTestId: PWIRegistrationFormElementInputs.LastNameHelperText,
    label: <Translate id={'pwiRegistration.fields.last.name.label'} />,
    name: 'lastName',
    testId: PWIRegistrationFormElementInputs.LastNameInput,
    type: 'string',
  },
];

export const birthdayField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.BirthdayHelperText,
  label: <Translate id={'pwiRegistration.fields.birthday.label'} />,
  name: 'birthday',
  testId: PWIRegistrationFormElementInputs.BirthdayInput,
  type: 'date',
};

export const genderField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.GenderHelperText,
  label: <Translate id={'pwiRegistration.fields.gender.label'} />,
  name: 'gender',
  testId: PWIRegistrationFormElementInputs.GenderInput,
  type: 'string',
};

export const addressFields: FormField<PWIRegistrationFormProps>[] = [
  {
    helperTextTestId: PWIRegistrationFormElementInputs.StreetAddressHelperText,
    label: <Translate id={'pwiRegistration.fields.street.address.label'} />,
    name: 'streetAddress',
    testId: PWIRegistrationFormElementInputs.StreetAddressInput,
    type: 'string',
  },
  {
    helperTextTestId: PWIRegistrationFormElementInputs.ZipCodeHelperText,
    label: <Translate id={'pwiRegistration.fields.zip.code.label'} />,
    name: 'zipCode',
    testId: PWIRegistrationFormElementInputs.ZipCodeInput,
    type: 'number',
  },
  {
    helperTextTestId: PWIRegistrationFormElementInputs.ApartmentNumberHelperText,
    label: <Translate id={'pwiRegistration.fields.apartment.number.label'} />,
    name: 'apartmentNumber',
    testId: PWIRegistrationFormElementInputs.ApartmentNumberInput,
    type: 'string',
  },
];

export const cellularNumberField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.CellularNumberHelperText,
  label: <Translate id={'pwiRegistration.fields.cellular.number.field.label'} />,
  name: 'cellularNumber',
  testId: PWIRegistrationFormElementInputs.CellularNumberInput,
  type: 'string',
};

export const businessPhoneNumberField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.BusinessPhoneNumberHelperText,
  label: <Translate id={'pwiRegistration.fields.business.phone.number.field.label'} />,
  name: 'businessPhoneNumber',
  testId: PWIRegistrationFormElementInputs.BusinessPhoneNumberInput,
  type: 'string',
};

export const pcpIdField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.PcpIdHelperText,
  label: <Translate id={'pwiRegistration.fields.pcp.id.field.label'} />,
  name: 'pcpId',
  testId: PWIRegistrationFormElementInputs.PcpIdInput,
  type: 'number',
};

export const registrationDateField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.RegistrationDateHelperText,
  label: <Translate id={'pwiRegistration.fields.registration.date.field.label'} />,
  name: 'registrationDate',
  testId: PWIRegistrationFormElementInputs.RegistrationDateInput,
  type: 'date',
};

export const balanceDueField: FormField<PWIRegistrationFormProps> = {
  helperTextTestId: PWIRegistrationFormElementInputs.BalanceDueHelperText,
  label: <Translate id={'pwiRegistration.fields.balance.due.field.label'} />,
  name: 'balanceDue',
  testId: PWIRegistrationFormElementInputs.BalanceDueInput,
  type: 'number',
};
