import { DataPointWithFormattedValue, Filters, InvestigationDataPoint, ReactElement } from '@kleeen/types';

import { FilterVariants } from '@kleeen/investigations';
import { ReactNode } from 'react';

export interface InvestigationItemData {
  investigationDataPoint: InvestigationDataPoint;
  pageFilters: Filters;
}

export interface InvestigationItemWithDataPointData extends InvestigationItemData {
  contextDataPoints: DataPointWithFormattedValue[];
  dataPointValues: {
    entity: string | ReactNode;
    filteredBy: string | ReactNode;
    filteredByEntity: string | ReactNode;
    value: string | ReactNode;
  };
  filters: FilterVariants;
}

export interface InvestigationItem extends InvestigationItemData {
  investigationFilters: Filters;
  label: ReactElement;
}
