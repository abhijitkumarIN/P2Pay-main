import React from 'react';
import { Checkbox, FormControl, FormHelperText } from '@material-ui/core';

import { FormCheckFieldProps } from './form-fields.model';

export default function FormCheckGroupField(props: FormCheckFieldProps) {
  const { fieldError, register, control, options, id, defaultValue, ...restProps } = props;
  return (
    <FormControl size={'small'} variant={'outlined'}>
      {options.map((option) => (
        <label key={option.label}>
          <Checkbox
            value={option.value}
            name={id}
            defaultChecked={defaultValue?.includes(option.value)}
            {...register}
          />
          {option.label}
        </label>
      ))}
      <FormHelperText error={Boolean(fieldError)}>{fieldError?.message}</FormHelperText>
    </FormControl>
  );
}
