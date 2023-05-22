import { Attribute, TIMESTAMP_INTERNAL_OBJECT_NAME } from '@kleeen/types';
import { useEffect, useState } from 'react';

import { DatePickerSectionProps } from './date-picker-section.model';
import { RelativeDateDropdown } from './components';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useFilterQueryActions } from '../filter-section/hooks';

export function DatePickerSection({ onFilter }: DatePickerSectionProps) {
  const { attributes } = useFilterQueryActions();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    if (isNilOrEmpty(attributes)) return;

    const timestampExistInAttributes = attributes.some(isTimestamp);

    setShowDatePicker(timestampExistInAttributes);
  }, [attributes]);

  if (!showDatePicker) return null;

  return <RelativeDateDropdown onFilter={onFilter} />;
}

//#region Private members
function isTimestamp(thing: Attribute) {
  return thing.name === TIMESTAMP_INTERNAL_OBJECT_NAME;
}
//#endregion
