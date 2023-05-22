import { Grid, Typography } from '@material-ui/core';
import { Control, UseFormRegister } from 'react-hook-form';
import { DonorRegistrationFormProps } from '../donor-registration-form/donor-registration-form.model';
import { PCPRegistrationFormProps } from '../pcp-registration-form/pcp-registration-form.model';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField } from './components';
import FormRadioField from './components/form-radio-field';

export function PWISingleRadioFormFields(props: {
  control?: Control<PWIRegistrationFormProps, any>;
  errors: { [key in keyof PWIRegistrationFormProps]?: any };
  field: FormField<PWIRegistrationFormProps>;
  fieldsName?: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<PWIRegistrationFormProps>;
}) {
  const { name } = props.field;

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
        <FormRadioField
          control={props.control}
          fieldError={props.errors[name]}
          id={name}
          options={props.options}
          register={props.register(name)}
        />
      </Grid>
    </>
  );
}

export function PCPSingleRadioFormFields(props: {
  control?: Control<PCPRegistrationFormProps, any>;
  errors: { [key in keyof PCPRegistrationFormProps]?: any };
  field: FormField<PCPRegistrationFormProps>;
  fieldsName?: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<PCPRegistrationFormProps>;
  value?: string | number | boolean;
}) {
  const { name } = props.field;

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
        <FormRadioField
          control={props.control}
          fieldError={props.errors[name]}
          id={name}
          options={props.options}
          register={props.register(name)}
          value={props.value}
        />
      </Grid>
    </>
  );
}

export function DonorSingleRadioFormFields(props: {
  control?: Control<DonorRegistrationFormProps, any>;
  errors: { [key in keyof DonorRegistrationFormProps]?: any };
  field: FormField<DonorRegistrationFormProps>;
  fieldsName?: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<DonorRegistrationFormProps>;
  value?: string | number | boolean;
}) {
  const { name } = props.field;

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
        <FormRadioField
          control={props.control}
          fieldError={props.errors[name]}
          id={name}
          options={props.options}
          register={props.register(name)}
          value={props.value}
        />
      </Grid>
    </>
  );
}
