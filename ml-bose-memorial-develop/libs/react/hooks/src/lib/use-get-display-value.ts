import { useEffect, useRef } from 'react';
import { useKleeenActions, useKleeenContext, useUrlQueryParams } from './index';

import { FormatProps } from '@kleeen/types';
import camelcase from 'lodash.camelcase';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';

interface WidgetDataType {
  entity: {
    [key: string]: { displayValue: string };
  };
  isLoading?: boolean;
  status: {
    version: number;
  };
}

interface DisplayValueReturn {
  displayValue: string;
  format?: FormatProps;
  isLoading?: boolean;
  objectValueId: string;
}

export function useGetDisplayValue({
  formatType,
  objectValue,
  taskName,
}: {
  formatType?: string;
  objectValue: string;
  taskName: string;
}): DisplayValueReturn {
  const versionRef = useRef();
  const attributes = [{ name: objectValue, aggregation: 'noAggregation' }];
  const { getRequest } = useKleeenActions(taskName) || {};
  const widgetData: WidgetDataType = useKleeenContext(taskName);
  const { paramsBasedOnRoute } = useUrlQueryParams();

  if (isNilOrEmpty(taskName) || isNilOrEmpty(objectValue)) {
    return { displayValue: '', objectValueId: '' };
  }

  const getDisplayValue = pathOr('', ['entity', objectValue, 'displayValue']);
  const getObjectValueId = pathOr('', ['entity', objectValue, 'id']);
  const geStatusVersion = pathOr('', ['status', 'version']);
  const format = pathOr({}, ['data', 'format', objectValue], widgetData);

  const displayValue = getDisplayValue(widgetData);
  const statusVersion = geStatusVersion(widgetData);
  const objectValueId = getObjectValueId(widgetData);

  const entityValue = paramsBasedOnRoute[camelcase(objectValue)];

  useEffect(() => {
    if (isNilOrEmpty(entityValue)) return;

    const areDifferentEntities = entityValue !== widgetData?.entity?.id;
    const isOutdated = versionRef.current !== statusVersion;
    const shouldBeUpdated = isNilOrEmpty(displayValue) || areDifferentEntities || isOutdated;

    if (!shouldBeUpdated) return;

    getRequest({
      entity: objectValue,
      params: {
        attributes,
        baseModel: objectValue,
        formatType,
        id: entityValue,
        taskName,
        value: entityValue,
      },
    });

    versionRef.current = statusVersion;
  }, [displayValue, entityValue, objectValue, statusVersion, taskName]);

  return { displayValue, objectValueId, format, isLoading: widgetData.isLoading };
}
