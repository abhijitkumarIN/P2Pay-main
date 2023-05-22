import {
  FilterOperation,
  FilterQuery,
  FilterRule,
  IntervalDate,
  SingleFilterRuleValue,
  TIMESTAMP_INTERNAL_OBJECT_NAME,
} from '@kleeen/types';
import { ItemType, KsBadge, KsButtonText, KsDropDown, KsSvgIcon } from '@kleeen/react/components';
import { MutableRefObject, Ref, forwardRef, useEffect, useState } from 'react';
import { useFilterQuery, useFilterQueryActions } from '../../filter-section/hooks';

import { DatePickerSectionProps } from '../date-picker-section.model';
import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function RelativeDateDropdown({ onFilter }: DatePickerSectionProps) {
  const { filterQuery, initialFilterQuery } = useFilterQuery();
  const { reset } = useFilterQueryActions();
  const [timestampRelativeDate, setTimestampRelativeDate] = useState<IntervalDate | null>(null);
  const [timestampRelativeDateOptions] = useState<ItemType<IntervalDate>[]>(() => {
    const newTimestampRelativeDateOptions = getTimestampRelativeDateOptions({ handleFilter });

    return newTimestampRelativeDateOptions;
  });

  useEffect(() => {
    const timestampRelativeDateRule = filterQuery.rules.find(isTimestampRelativeDateRule);

    if (isNilOrEmpty(timestampRelativeDateRule)) {
      setTimestampRelativeDate(null);
      return;
    }

    const value = timestampRelativeDateRule.value as SingleFilterRuleValue;

    setTimestampRelativeDate(value.displayValue as IntervalDate);
  }, [filterQuery.rules]);

  const BadgeContent = timestampRelativeDate && (
    <Translate id={`app.dateInterval.interval.badge.${timestampRelativeDate}`} />
  );
  const DatePickerButton = forwardRef(
    ({ setOpen }: { setOpen: (open: boolean) => void }, ref: MutableRefObject<HTMLElement>) => {
      return (
        <KsButtonText onClick={() => setOpen(true)} ref={ref as Ref<HTMLButtonElement>}>
          <KsBadge badgeContent={BadgeContent} color="secondary">
            <KsSvgIcon icon="ks-date-picker" size="large" />
          </KsBadge>
        </KsButtonText>
      );
    },
  );

  function handleFilter(relativeDate: IntervalDate) {
    const newFilterQuery = {
      ...filterQuery,
      rules: getFilterQueryRules({ filterQuery, relativeDate }),
    };

    onFilter(newFilterQuery);
    reset(initialFilterQuery);
  }

  return (
    <KsDropDown
      headerTranslationId="app.dateInterval.title"
      options={timestampRelativeDateOptions}
      placement="bottom-start"
      InputElement={DatePickerButton}
    />
  );
}

//#region Private members
function getFilterQueryRules({
  filterQuery,
  relativeDate,
}: {
  filterQuery: FilterQuery;
  relativeDate: IntervalDate;
}): FilterRule[] {
  const { rules } = filterQuery;
  const rulesExcludingTimestampRules = rules.filter((rule) => !isTimestampRule(rule));

  // Exclude all Timestamp rules, adding a new rule with the selected interval.
  return [
    ...rulesExcludingTimestampRules,
    {
      field: TIMESTAMP_INTERNAL_OBJECT_NAME,
      operation: FilterOperation.RelativeDate,
      value: { displayValue: relativeDate },
    },
  ];
}

function getTimestampRelativeDateOptions({
  handleFilter,
}: {
  handleFilter: (relativeDate: IntervalDate) => void;
}): ItemType<IntervalDate>[] {
  return Object.entries(IntervalDate).map(([key, value]: [string, IntervalDate]) => {
    return {
      key: `relative-date-dropdown-${key}`,
      handleOnClick(_: React.MouseEvent<HTMLElement, MouseEvent>, item: ItemType<IntervalDate>) {
        handleFilter(item.option);
      },
      label: <Translate id={`app.dateInterval.interval.${key}`} />,
      option: value,
    };
  });
}

function isTimestampRule({ field }: FilterRule) {
  return field === TIMESTAMP_INTERNAL_OBJECT_NAME;
}

function isTimestampRelativeDateRule(rule: FilterRule) {
  const { operation } = rule;

  return isTimestampRule(rule) && operation === FilterOperation.RelativeDate;
}
//#endregion
