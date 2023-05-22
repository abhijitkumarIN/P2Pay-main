import { Attribute, FilterRule } from '@kleeen/types';
import { useEffect, useState } from 'react';

import { isFilterIdOnly } from '../utils';
import { useFilterQueryActions } from '../../filter-section/hooks';

interface IsFilterDisabled {
  attributes: Attribute[];
  filterRule: FilterRule;
}

export function useIsFilterDisabled(filterRule: FilterRule): boolean {
  const { attributes } = useFilterQueryActions();
  const [isFilterDisabled, setIsFilterDisabled] = useState(false);

  useEffect(() => {
    const newIsFilterDisabled = areFilterFieldAndOperationDisabled({
      attributes,
      filterRule,
    });

    setIsFilterDisabled(newIsFilterDisabled);
  }, [attributes]);

  return isFilterDisabled;
}

//#region Private members
function areFilterFieldAndOperationDisabled({ attributes, filterRule }: IsFilterDisabled): boolean {
  const isDisabled =
    isFilterIdOnly(filterRule) ||
    isFilterFieldIsNotPartOfAvailableAttributes({
      attributes,
      filterRule,
    });

  return isDisabled;
}

function isFilterFieldIsNotPartOfAvailableAttributes({ attributes, filterRule }: IsFilterDisabled): boolean {
  const isPartOfAvailableAttributes = attributes.some(({ name }) => name === filterRule.field);

  return !isPartOfAvailableAttributes;
}
//#endregion
