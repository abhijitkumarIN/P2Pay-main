import { FormTextFieldProps } from './form-fields.model';
import classNames from 'classnames';
import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { FormControl, styled } from '@material-ui/core';
import { Controller } from 'react-hook-form';

export const PhoneNumber = styled(MuiPhoneNumber)({
  '&.MuiFormControl-root': {
    paddingBottom: 'var(--pm-M)',
    paddingRight: 'var(--pm-3XS)',
    marginTop: 'var(--pm-M)',
    width: '100%',
  },
});

const ClassNameBem = 'formPhoneFieldBem';

export function FormPhoneField(props: FormTextFieldProps) {
  const { control, disabled, fieldError, register, value: defaultValue, ...restProps } = props;

  return (
    <Controller
      control={control as any}
      name={restProps.name}
      render={({ field: { onChange, value } }) => (
        <FormControl variant="outlined">
          <PhoneNumber
            className={classNames(ClassNameBem, {
              [`${ClassNameBem}--read-only`]: props.inputProps?.['readOnly'],
            })}
            control={control}
            defaultValue={defaultValue}
            disabled={disabled}
            name={restProps.id}
            onChange={onChange}
            value={defaultValue}
            variant="outlined"
            error={Boolean(fieldError)}
            helperText={fieldError?.message}
            {...restProps}
          />
        </FormControl>
      )}
    />
  );
}
