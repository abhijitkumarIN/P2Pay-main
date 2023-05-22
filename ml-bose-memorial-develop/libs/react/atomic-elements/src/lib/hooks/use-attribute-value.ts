import { Cell, WidgetDataAttributes } from '@kleeen/types';
import { useEffect, useState } from 'react';

import { INITIAL_ATTRIBUTE_VALUE_HAS_MANY } from '../components/widgets/config-input-widget';
import camelcase from 'lodash.camelcase';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';

export function useAttributeValue({
  attribute,
  data,
  isLoading,
  isDisplay = false,
}): undefined | Cell | Cell[] {
  const [attributeValue, setAttributeValue] = useState(undefined);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isNilOrEmpty(data)) {
      return;
    }

    const newAttributeValue = isDisplay
      ? getDisplayAttribute({
          attribute,
          data,
        })
      : getAttribute({
          attribute,
          data,
        });

    setAttributeValue(newAttributeValue);
  }, [isLoading]);

  return attributeValue;
}

//#region Private members
function getAttribute({ attribute, data }) {
  const { hasMany, name } = attribute;
  const attributeValuePath = ['data', name];

  if (hasMany) {
    return pathOr(INITIAL_ATTRIBUTE_VALUE_HAS_MANY, attributeValuePath, data);
  } else {
    return pathOr({}, [...attributeValuePath], data);
  }
}

function getDisplayAttribute({ attribute, data }) {
  const { name } = attribute;
  const attributeValuePath = ['data', name];

  return pathOr({}, [...attributeValuePath], data);
}
//#endregion
