import { FormTextFieldProps } from './form-fields.model';
import classNames from 'classnames';
import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { FormHelperText, styled } from '@material-ui/core';
import { useStyles } from './form-fields.style';

export const TextField = styled(MuiTextField)({
  '&.MuiFormControl-root': {
    paddingRight: 'var(--pm-3XS)',
    width: '100%',
  },
});

const ClassNameBem = 'formTextFieldBem';

export function FormTextField(props: FormTextFieldProps) {
  const { helperText, fieldError, register, ...restProps } = props;
  const classes = useStyles();

  const inputLabelProps = props.type === 'date' ? { shrink: true } : {};

  return (
    <div className={classNames(`${ClassNameBem}`, classes.textFieldContainer)}>
      <TextField
        className={classNames(ClassNameBem, {
          [`${ClassNameBem}--read-only`]: props.inputProps?.['readOnly'],
        })}
        error={Boolean(fieldError)}
        helperText={fieldError?.message}
        role="textbox"
        variant="outlined"
        InputLabelProps={inputLabelProps}
        {...restProps}
        {...register}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </div>
  );
}
