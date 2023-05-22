import { GetInvestigationItemsProps, getInvestigationItemValues } from '../investigation-items';

import { InvestigationItem } from '../investigation-item.model';
import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function getStartInvestigationItems(props: GetInvestigationItemsProps): InvestigationItem[] {
  const investigationItemValues = getInvestigationItemValues(props);

  if (isNilOrEmpty(investigationItemValues)) {
    return [];
  }

  const { contextDataPoints, dataPointValues, filters, investigationDataPoint, pageFilters } =
    investigationItemValues;
  const investigationItems: InvestigationItem[] = [
    {
      investigationDataPoint,
      investigationFilters: {
        ...filters.contextFilters,
        ...filters.dataPointFilters,
      },
      label: (
        <Translate
          id={'app.contextMenu.startInvestigation.unfiltered'}
          type="html"
          values={dataPointValues}
        />
      ),
      pageFilters,
    },
  ];

  if (!isNilOrEmpty(contextDataPoints)) {
    investigationItems.push({
      investigationDataPoint,
      investigationFilters: {
        ...filters.contextFilters,
        ...filters.contextDataPointFilters,
        ...filters.dataPointFilters,
      },
      label: (
        <Translate id={'app.contextMenu.startInvestigation.filtered'} type="html" values={dataPointValues} />
      ),
      pageFilters,
    });
  }

  return investigationItems;
}
