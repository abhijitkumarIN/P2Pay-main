import { CalendarToday } from '@material-ui/icons';
import { DatePickerInputProps } from './date-picker.model';
import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KsDatePicker } from './date-picker';
import { KsTextField } from '../text-field';
import Popover from '@material-ui/core/Popover';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { toDateTimeFormat } from '@kleeen/i18n';
import { useState } from 'react';
import { useTheme } from '@kleeen/react/hooks';

export function KsDatePickerInput({ initialTimestamp, onChange }: DatePickerInputProps) {
  const [humanReadableDate, setHumanReadableDate] = useState(() => {
    if (!isNilOrEmpty(initialTimestamp)) {
      return toDateTimeFormat(initialTimestamp);
    }
  });
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const { themeClass } = useTheme();

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setOpen(false);
  }

  function handleDateUpdate(date: number) {
    setHumanReadableDate(toDateTimeFormat(date));
    onChange(date);
  }

  return (
    <>
      <KsTextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton edge="end" size="small">
                <CalendarToday />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onClick={handleClick}
        value={humanReadableDate}
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={themeClass}
        onClose={handleClose}
        open={open}
      >
        <KsDatePicker initialTimestamp={initialTimestamp} onChange={handleDateUpdate} />
      </Popover>
    </>
  );
}
