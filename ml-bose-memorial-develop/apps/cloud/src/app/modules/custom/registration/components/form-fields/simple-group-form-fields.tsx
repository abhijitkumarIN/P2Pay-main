import { FormHelperTextProps, Grid, GridSize, Typography } from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';
import { DonorRegistrationFormProps } from '../donor-registration-form/donor-registration-form.model';
import { PCPRegistrationFormProps } from '../pcp-registration-form/pcp-registration-form.model';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField, FormTextField } from './components';

export function PWISimpleGroupFormFields(props: {
  errors: { [key in keyof PWIRegistrationFormProps]?: any };
  fields: FormField<PWIRegistrationFormProps>[];
  fieldsName: string;
  register: UseFormRegister<PWIRegistrationFormProps>;
}) {
  return (
    <>
      <Grid
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
        item
        xs={10}
        sm={4}
        key={props.fieldsName}
      >
        <Typography>{props.fieldsName}</Typography>
      </Grid>
      {props.fields.map(({ helperTextTestId, label, name, testId, type, readOnly, size }) => (
        <Grid item xs={10} sm={3} key={name} spacing={1} justify="space-between">
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

export function PCPSimpleGroupFormFields(props: {
  errors: { [key in keyof PCPRegistrationFormProps]?: any };
  fields: FormField<PCPRegistrationFormProps>[];
  fieldsName: string;
  register: UseFormRegister<PCPRegistrationFormProps>;
}) {
  return (
    <>
      <Grid
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
        item
        xs={10}
        sm={10}
        key={props.fieldsName}
      >
        <Typography>{props.fieldsName}</Typography>
      </Grid>
      {props.fields.map(({ helperTextTestId, label, name, testId, type, readOnly, size }) => (
        <Grid item xs={10} sm={size ? (size as GridSize) : 6} key={name} spacing={1} justify="space-between">
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

export function DonorSimpleGroupFormFields(props: {
  errors: { [key in keyof DonorRegistrationFormProps]?: any };
  fields: FormField<DonorRegistrationFormProps>[];
  fieldsName: string;
  register: UseFormRegister<DonorRegistrationFormProps>;
}) {
  return (
    <>
      <Grid
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
        item
        xs={10}
        sm={4}
        key={props.fieldsName}
      >
        <Typography>{props.fieldsName}</Typography>
      </Grid>
      {props.fields.map(({ helperTextTestId, label, name, testId, type, readOnly }) => (
        <Grid item xs={10} sm={3} key={name} spacing={1} justify="space-between">
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
