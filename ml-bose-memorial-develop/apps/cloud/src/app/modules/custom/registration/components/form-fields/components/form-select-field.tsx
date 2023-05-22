import { InputLabel, MenuItem, Select } from '@material-ui/core';
import MuiFormControl from '@material-ui/core/FormControl';
import { useFormContext, Controller } from 'react-hook-form';
import { FormSelectFieldProps } from './form-fields.model';
import { FormHelperText, styled } from '@material-ui/core';

export const FormControl = styled(MuiFormControl)({
  '&.MuiFormControl-root': {
    paddingBottom: 'var(--pm-M)',
    paddingRight: 'var(--pm-3XS)',
    marginTop: 'var(--pm-M)',
    width: '100%',
  },
});

export default function FormSelectField(props: FormSelectFieldProps) {
  const { control, fieldError, id, options, register, value: defaultValue, ...restProps } = props;

  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control as any}
      name={id}
      render={({ field: { onChange, value } }) => (
        <FormControl variant="outlined">
          <InputLabel id="simple-select-helper-label">{id}</InputLabel>
          <Select onChange={onChange} value={value} defaultValue={defaultValue} {...restProps} {...register}>
            {generateSelectOptions()}
          </Select>
          <FormHelperText>{fieldError?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
