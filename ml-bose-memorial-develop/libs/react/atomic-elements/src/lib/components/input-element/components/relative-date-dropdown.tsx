import { IntervalDate, ListItem } from '@kleeen/types';
import { KsAutocomplete, KsTextField } from '@kleeen/react/components';
import { memo, useState } from 'react';

import { KUIConnect } from '@kleeen/core-react';

export function RelativeDateDropdownComponent({ setValue, translate, value }) {
  const [relativeDateOptions] = useState<ListItem[]>(() => {
    const newRelativeDateOptions = getRelativeDateOptions({ translate });

    return newRelativeDateOptions;
  });

  return (
    <KsAutocomplete
      getOptionLabel={(option: ListItem | string) => getLabel(option, relativeDateOptions)}
      onChange={(_, option: ListItem) => setValue(option.value)}
      options={relativeDateOptions}
      renderInput={(params) => (
        <KsTextField
          {...params}
          inputProps={{
            ...params.inputProps,
          }}
          InputProps={{ ...params.InputProps }}
        />
      )}
      value={value}
    />
  );
}

export const RelativeDateDropdown = memo(
  KUIConnect(({ translate }) => ({ translate }))(RelativeDateDropdownComponent),
);

//#region Private members
function getLabel(option: ListItem | string, options: ListItem[]) {
  const selectedRelativeDateOption = options.find((relativeDateOption) => {
    const intervalDate = relativeDateOption.value as IntervalDate;
    const isIntervalDate = typeof option == 'string';

    if (isIntervalDate) {
      return intervalDate === option;
    }

    return intervalDate === (option as ListItem).value;
  });

  return selectedRelativeDateOption.displayValue;
}

function getRelativeDateOptions({ translate }): ListItem[] {
  return Object.entries(IntervalDate).map(([key, value]: [string, IntervalDate]) => {
    return {
      displayValue: translate(`app.dateInterval.interval.${key}`),
      value,
    };
  });
}
//#endregion
