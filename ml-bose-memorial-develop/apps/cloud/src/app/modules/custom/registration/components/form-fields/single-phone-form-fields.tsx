import { FormHelperTextProps, Grid, Typography } from '@material-ui/core';
import { Control, UseFormRegister } from 'react-hook-form';
import { DonorRegistrationFormProps } from '../donor-registration-form/donor-registration-form.model';
import { PCPRegistrationFormProps } from '../pcp-registration-form/pcp-registration-form.model';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField } from './components';
import { FormPhoneField } from './components/form-phone-field';

export function PWISinglePhoneFormFields(props: {
  control?: Control<PWIRegistrationFormProps, any>;
  disabled?: boolean;
  errors: { [key in keyof PWIRegistrationFormProps]?: any };
  field: FormField<PWIRegistrationFormProps>;
  fieldsName?: string;
  register: UseFormRegister<PWIRegistrationFormProps>;
  value?: string;
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
        <FormPhoneField
          control={props.control}
          disabled={props.disabled}
          fieldError={props.errors[name]}
          FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
          id={name}
          inputProps={{ 'data-testid': testId, readOnly }}
          label={label}
          name={name}
          register={props.register(name)}
          type={type}
          value={props.value}
        />
      </Grid>
    </>
  );
}

export function PCPSinglePhoneFormFields(props: {
  control?: Control<PCPRegistrationFormProps, any>;
  disabled?: boolean;
  errors: { [key in keyof PCPRegistrationFormProps]?: any };
  field: FormField<PCPRegistrationFormProps>;
  fieldsName?: string;
  register: UseFormRegister<PCPRegistrationFormProps>;
  value?: string;
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
        <FormPhoneField
          control={props.control}
          disabled={props.disabled}
          fieldError={props.errors[name]}
          FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
          id={name}
          inputProps={{ 'data-testid': testId, readOnly }}
          label={label}
          name={name}
          register={props.register(name)}
          type={type}
          value={props.value}
        />
      </Grid>
    </>
  );
}

export function DonorSinglePhoneFormFields(props: {
  control?: Control<DonorRegistrationFormProps, any>;
  disabled?: boolean;
  errors: { [key in keyof DonorRegistrationFormProps]?: any };
  field: FormField<DonorRegistrationFormProps>;
  fieldsName?: string;
  register: UseFormRegister<DonorRegistrationFormProps>;
  value?: string;
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
        <FormPhoneField
          control={props.control}
          disabled={props.disabled}
          fieldError={props.errors[name]}
          FormHelperTextProps={{ 'data-testid': helperTextTestId } as unknown as FormHelperTextProps}
          id={name}
          inputProps={{ 'data-testid': testId, readOnly }}
          label={label}
          name={name}
          register={props.register(name)}
          type={type}
          value={props.value}
        />
      </Grid>
    </>
  );
}
