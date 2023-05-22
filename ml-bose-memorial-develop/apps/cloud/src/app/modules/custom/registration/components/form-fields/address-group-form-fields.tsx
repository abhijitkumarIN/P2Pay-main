import { FormHelperTextProps, Grid, Typography } from '@material-ui/core';
import { Control, UseFormRegister } from 'react-hook-form';
import {
  AddressField,
  DonorRegistrationFormProps,
} from '../donor-registration-form/donor-registration-form.model';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField, FormTextField } from './components';
import country from 'country-list-js';
import FormSelectField from './components/form-select-field';

export function PWIAddressGroupFormFields(props: {
  errors: { [key in keyof PWIRegistrationFormProps]?: any };
  fields: FormField<PWIRegistrationFormProps>[];
  fieldsName: string;
  register: UseFormRegister<PWIRegistrationFormProps>;
}) {
  const [streetAddress, ...restAddressFields] = props.fields;

  return (
    <>
      <Grid
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '13px',
        }}
        item
        xs={10}
        sm={10}
        key={`${name}-title`}
      >
        <Typography>{props.fieldsName}</Typography>
      </Grid>
      {[streetAddress].map(({ helperTextTestId, label, name, testId, type, readOnly }) => (
        <Grid item xs={10} sm={10} key={`${name}-fields`}>
          <FormTextField
            fieldError={props.errors[name]}
            FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
            id={name}
            inputProps={{ 'data-testid': testId, readOnly }}
            label={label}
            register={props.register(name)}
            type={type}
          />
        </Grid>
      ))}
      {restAddressFields.map(({ helperTextTestId, label, name, testId, type, readOnly }) => (
        <Grid item xs={10} sm={5} key={name} spacing={1} justify="space-between">
          <FormTextField
            fieldError={props.errors[name]}
            FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
            id={name}
            inputProps={{ 'data-testid': testId, readOnly }}
            label={label}
            register={props.register(name)}
            type={type}
          />
        </Grid>
      ))}
    </>
  );
}

export function DonorAddressGroupFormFields(props: {
  control: Control<DonorRegistrationFormProps, any>;
  errors: { [key in keyof DonorRegistrationFormProps]?: any };
  fields: FormField<DonorRegistrationFormProps>[];
  fieldsName: string;
  register: UseFormRegister<DonorRegistrationFormProps>;
  value?: string | number | boolean;
}) {
  const [streetAddress, streetAddressLine2, ...restAddressFields] = props.fields;

  const listOfCountries = country.names().map((country) => {
    return { label: country, value: country };
  });

  return (
    <>
      <Grid
        item
        key={`${name}-title`}
        sm={10}
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '13px',
        }}
        xs={10}
      >
        <Typography>{props.fieldsName}</Typography>
      </Grid>
      {[streetAddress, streetAddressLine2].map(
        ({ helperTextTestId, label, name, testId, type, readOnly }) => (
          <Grid item xs={10} sm={10} key={`${name}-fields`}>
            <FormTextField
              fieldError={props.errors[name]}
              FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
              id={name}
              inputProps={{ 'data-testid': testId, readOnly }}
              label={label}
              register={props.register(name)}
              type={type}
            />
          </Grid>
        ),
      )}
      {restAddressFields.map(({ helperTextTestId, label, name, testId, type, readOnly }) => (
        <Grid item xs={10} sm={5} key={name} spacing={1} justify="space-between">
          {name === AddressField.Country ? (
            <FormSelectField
              control={props.control}
              fieldError={props.errors[name]}
              id={name}
              inputProps={{ 'data-testid': testId, readOnly }}
              label={label}
              options={listOfCountries}
              register={props.register(name)}
              type={type}
              value={props.value}
            />
          ) : (
            <FormTextField
              fieldError={props.errors[name]}
              FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
              id={name}
              inputProps={{ 'data-testid': testId, readOnly }}
              label={label}
              register={props.register(name)}
              type={type}
            />
          )}
        </Grid>
      ))}
    </>
  );
}
