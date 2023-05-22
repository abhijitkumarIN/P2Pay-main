import { Grid, Typography } from '@material-ui/core';
import { Control, UseFormRegister } from 'react-hook-form';
import { DonorRegistrationFormProps } from '../donor-registration-form/donor-registration-form.model';
import { PCPRegistrationFormProps } from '../pcp-registration-form/pcp-registration-form.model';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField } from './components';
import FormCheckGroupField from './components/form-check-field';

export function SingleCheckGroupFormFields(props: {
  control?:
    | Control<DonorRegistrationFormProps, any>
    | Control<PWIRegistrationFormProps, any>
    | Control<PCPRegistrationFormProps, any>;
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
        <FormCheckGroupField
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

export function PCPSingleCheckGroupFormFields(props: {
  control?: Control<PCPRegistrationFormProps, any>;
  defaultValue?: string[];
  errors: { [key in keyof PCPRegistrationFormProps]?: any };
  field: FormField<PCPRegistrationFormProps>;
  fieldsName?: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<PCPRegistrationFormProps>;
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
        <FormCheckGroupField
          control={props.control}
          defaultValue={props.defaultValue}
          fieldError={props.errors[name]}
          id={name}
          options={props.options}
          register={props.register(name)}
        />
      </Grid>
    </>
  );
}
