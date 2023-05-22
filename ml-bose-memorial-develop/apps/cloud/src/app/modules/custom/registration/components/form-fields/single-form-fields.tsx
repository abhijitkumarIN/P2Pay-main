import { FormHelperTextProps, Grid, Typography } from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';
import { DonorRegistrationFormProps } from '../donor-registration-form/donor-registration-form.model';
import { PCPRegistrationFormProps } from '../pcp-registration-form/pcp-registration-form.model';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField, FormTextField } from './components';

export function PWISingleFormFields(props: {
  errors: { [key in keyof PWIRegistrationFormProps]?: any };
  field: FormField<PWIRegistrationFormProps>;
  fieldsName?: string;
  helperText?: string;
  register: UseFormRegister<PWIRegistrationFormProps>;
}) {
  const { helperTextTestId, label, name, testId, type, readOnly } = props.field;
  return (
    <>
      {props.fieldsName && (
        <Grid
          item
          key={props.fieldsName}
          sm={4}
          style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
          xs={10}
        >
          <Typography>{props.fieldsName}</Typography>
        </Grid>
      )}

      <Grid item xs={10} sm={6} key={name}>
        <FormTextField
          fieldError={props.errors[name]}
          FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
          helperText={props?.helperText}
          id={name}
          inputProps={{ 'data-testid': testId, readOnly }}
          label={label}
          register={props.register(name)}
          type={type}
        />
      </Grid>
    </>
  );
}

export function PCPSingleFormFields(props: {
  errors: { [key in keyof PCPRegistrationFormProps]?: any };
  field: FormField<PCPRegistrationFormProps>;
  fieldsName?: string;
  helperText?: string;
  register: UseFormRegister<PCPRegistrationFormProps>;
}) {
  const { helperTextTestId, label, name, testId, type, readOnly } = props.field;
  return (
    <>
      {props.fieldsName && (
        <Grid
          item
          key={props.fieldsName}
          sm={4}
          style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
          xs={10}
        >
          <Typography>{props.fieldsName}</Typography>
        </Grid>
      )}

      <Grid item xs={10} sm={6} key={name}>
        <FormTextField
          fieldError={props.errors[name]}
          FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
          helperText={props?.helperText}
          id={name}
          inputProps={{ 'data-testid': testId, readOnly }}
          label={label}
          register={props.register(name)}
          type={type}
        />
      </Grid>
    </>
  );
}

export function DonorSingleFormFields(props: {
  errors: { [key in keyof DonorRegistrationFormProps]?: any };
  field: FormField<DonorRegistrationFormProps>;
  fieldsName?: string;
  register: UseFormRegister<DonorRegistrationFormProps>;
}) {
  const { helperTextTestId, label, name, testId, type, readOnly } = props.field;
  return (
    <>
      {props.fieldsName && (
        <Grid
          item
          key={props.fieldsName}
          sm={4}
          style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
          xs={10}
        >
          <Typography>{props.fieldsName}</Typography>
        </Grid>
      )}

      <Grid item xs={10} sm={6} key={name}>
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
    </>
  );
}
