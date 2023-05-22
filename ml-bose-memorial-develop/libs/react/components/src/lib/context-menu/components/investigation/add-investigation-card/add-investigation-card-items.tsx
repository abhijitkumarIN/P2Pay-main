import { GetInvestigationItemsProps, getInvestigationItemValues } from '../investigation-items';

import { InvestigationItem } from '../investigation-item.model';
import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function getAddInvestigationCardItems(props: GetInvestigationItemsProps): InvestigationItem[] {
  const investigationItemValues = getInvestigationItemValues(props);
  if (isNilOrEmpty(investigationItemValues)) {
    return [];
  }

  const { dataPointValues, filters, investigationDataPoint, pageFilters } = investigationItemValues;

  const investigationItems: InvestigationItem[] = [
    {
      investigationDataPoint,
      investigationFilters: {
        ...filters.contextFilters,
        ...filters.contextDataPointFilters,
        ...filters.dataPointFilters,
      },
      pageFilters,
      label: (
        <Translate id={'app.contextMenu.addInvestigationCard.further'} type="html" values={dataPointValues} />
      ),
    },
    {
      investigationDataPoint,
      investigationFilters: {
        ...filters.contextDataPointFilters,
        ...filters.dataPointFilters,
      },
      pageFilters,
      label: (
        <Translate id={'app.contextMenu.addInvestigationCard.pivot'} type="html" values={dataPointValues} />
      ),
    },
  ];

  return investigationItems;
}
