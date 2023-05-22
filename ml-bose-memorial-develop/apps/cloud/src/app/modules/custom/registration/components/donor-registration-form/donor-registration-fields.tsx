import { Translate } from '@kleeen/core-react';
import { FormField } from '../form-fields/components';
import {
  DonorRegistrationFormElementInputs,
  DonorRegistrationFormProps,
} from './donor-registration-form.model';

export const personalInfoFields: FormField<DonorRegistrationFormProps>[] = [
  {
    helperTextTestId: DonorRegistrationFormElementInputs.FirstNameHelperText,
    label: <Translate id={'donorRegistration.fields.first.name.label'} />,
    name: 'firstName',
    testId: DonorRegistrationFormElementInputs.FirstNameInput,
    type: 'string',
  },
  {
    helperTextTestId: DonorRegistrationFormElementInputs.LastNameHelperText,
    label: <Translate id={'donorRegistration.fields.last.name.label'} />,
    name: 'lastName',
    testId: DonorRegistrationFormElementInputs.LastNameInput,
    type: 'string',
  },
];

export const businessField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.BusinessHelperText,
  label: <Translate id={'donorRegistration.fields.business.label'} />,
  name: 'business',
  testId: DonorRegistrationFormElementInputs.BusinessInput,
  type: 'string',
};

export const emailField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.EmailHelperText,
  label: <Translate id={'donorRegistration.fields.email.field.label'} />,
  name: 'email',
  testId: DonorRegistrationFormElementInputs.EmailHelperText,
  type: 'string',
};

export const cellularNumberField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.CellularNumberInput,
  label: <Translate id={'donorRegistration.fields.cellular.number.field.label'} />,
  name: 'cellularNumber',
  testId: DonorRegistrationFormElementInputs.CellularNumberInput,
  type: 'string',
};

export const faxNumberField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.FaxNumberHelperText,
  label: <Translate id={'donorRegistration.fields.fax.number.label'} />,
  name: 'faxNumber',
  testId: DonorRegistrationFormElementInputs.FaxNumberInput,
  type: 'string',
};

export const annualCommitmentField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.AnnualCommitmentHelperText,
  label: <Translate id={'donorRegistration.fields.annual.commitment.field.label'} />,
  name: 'annualCommitment',
  testId: DonorRegistrationFormElementInputs.AnnualCommitmentInput,
  type: 'string',
};

export const donatingToPerson: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.DonatingToPersonHelperText,
  label: <Translate id={'donorRegistration.fields.donating.to.person.field.label'} />,
  name: 'donatingToPerson',
  testId: DonorRegistrationFormElementInputs.DonatingToPersonInput,
  type: 'boolean',
};

export const askByPersonField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.AskByPersonHelperText,
  label: <Translate id={'donorRegistration.fields.ask.by.person.field.label'} />,
  name: 'askByPerson',
  testId: DonorRegistrationFormElementInputs.AskByPersonInput,
  type: 'boolean',
};

export const annualCommitmentForPersonField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.AnnualCommitmentForPersonHelperText,
  label: <Translate id={'donorRegistration.fields.annual.commitment.for.person.field.label'} />,
  name: 'annualCommitmentForPerson',
  testId: DonorRegistrationFormElementInputs.AnnualCommitmentForPersonInput,
  type: 'string',
};

export const minPerTransactionField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.MinPerTransactionHelperText,
  label: <Translate id={'donorRegistration.fields.min.per.transaction.field.label'} />,
  name: 'minPerTransaction',
  testId: DonorRegistrationFormElementInputs.MinPerTransactionInput,
  type: 'number',
};

export const maxPerTransactionField: FormField<DonorRegistrationFormProps> = {
  helperTextTestId: DonorRegistrationFormElementInputs.MaxPerTransactionHelperText,
  label: <Translate id={'donorRegistration.fields.max.per.transaction.field.label'} />,
  name: 'maxPerTransaction',
  testId: DonorRegistrationFormElementInputs.MaxPerTransactionInput,
  type: 'number',
};

export const addressFields: FormField<DonorRegistrationFormProps>[] = [
  {
    helperTextTestId: DonorRegistrationFormElementInputs.StreetAddressHelperText,
    label: <Translate id={'donorRegistration.fields.street.address.label'} />,
    name: 'streetAddress',
    testId: DonorRegistrationFormElementInputs.StreetAddressInput,
    type: 'string',
  },
  {
    helperTextTestId: DonorRegistrationFormElementInputs.StreetAddressLine2HelperText,
    label: <Translate id={'donorRegistration.fields.street.address.line2.label'} />,
    name: 'streetAddressLine2',
    testId: DonorRegistrationFormElementInputs.StreetAddressLine2Input,
    type: 'string',
  },
  {
    helperTextTestId: DonorRegistrationFormElementInputs.CityHelperText,
    label: <Translate id={'donorRegistration.fields.city.label'} />,
    name: 'city',
    testId: DonorRegistrationFormElementInputs.CityInput,
    type: 'string',
  },
  {
    helperTextTestId: DonorRegistrationFormElementInputs.StateHelperText,
    label: <Translate id={'donorRegistration.fields.state.label'} />,
    name: 'state',
    testId: DonorRegistrationFormElementInputs.StateInput,
    type: 'string',
  },
  {
    helperTextTestId: DonorRegistrationFormElementInputs.ZipCodeHelperText,
    label: <Translate id={'donorRegistration.fields.zip.code.label'} />,
    name: 'zipCode',
    testId: DonorRegistrationFormElementInputs.ZipCodeInput,
    type: 'number',
  },
  {
    helperTextTestId: DonorRegistrationFormElementInputs.CountryHelperText,
    label: <Translate id={'donorRegistration.fields.country.label'} />,
    name: 'country',
    testId: DonorRegistrationFormElementInputs.CountryInput,
    type: 'string',
  },
];
