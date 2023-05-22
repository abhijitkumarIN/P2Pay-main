import React from 'react';
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { FormRadioFieldProps } from './form-fields.model';
import { useStyles } from './form-fields.style';
import classNames from 'classnames';

const bem = 'ks-radio-group';

export default function FormRadioField(props: FormRadioFieldProps) {
  const { fieldError, register, control, options, id, value: defaultValue, ...restProps } = props;
  const classes = useStyles();
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel value={singleOption.value} label={singleOption.label} control={<Radio />} />
    ));
  };

  return (
    <Controller
      control={control as any}
      name={id}
      render={({ field: { onChange, value } }) => (
        <FormControl>
          <RadioGroup
            className={classNames(`${bem}__radio`, Boolean(fieldError) && classes.radioButtonError)}
            defaultValue={defaultValue}
            onChange={onChange}
            value={value}
          >
            {generateRadioOptions()}
          </RadioGroup>
          <FormHelperText error={Boolean(fieldError)}>{fieldError?.message}</FormHelperText>
        </FormControl>
      )}
      {...register}
    />
  );
}
