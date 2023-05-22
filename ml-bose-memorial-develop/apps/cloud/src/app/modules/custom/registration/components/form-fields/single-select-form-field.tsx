import { Grid, Typography } from '@material-ui/core';
import { Control, UseFormRegister } from 'react-hook-form';
import { PWIRegistrationFormProps } from '../pwi-registration-form/pwi-registration-form.model';
import { FormField } from './components';
import FormSelectField from './components/form-select-field';

export function PWISingleSelectFormField(props: {
  control?: Control<PWIRegistrationFormProps, any>;
  errors: { [key in keyof PWIRegistrationFormProps]?: any };
  field: FormField<PWIRegistrationFormProps>;
  fieldsName?: string;
  helperText?: string;
  options?: { label: string; value: string }[];
  register: UseFormRegister<PWIRegistrationFormProps>;
}) {
  const { label, name, testId, type, readOnly } = props.field;

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
        <FormSelectField
          control={props.control}
          fieldError={props.errors[name]}
          id={name}
          inputProps={{ 'data-testid': testId, readOnly }}
          label={label}
          options={props.options}
          register={props.register(name)}
          type={type}
        />
      </Grid>
    </>
  );
}
