import { DataPointWithFormattedValue } from '@kleeen/types';
import { ReactNode } from 'react';
import { isSingleCardinalityDataPoint } from '@kleeen/frontend/utils';

interface InvestigationSectionLabelValues {
  stringTranslationKey: string;
  values: { entity: string; value: ReactNode };
}

export function getInvestigationSectionLabel(
  dataPoint: DataPointWithFormattedValue,
): InvestigationSectionLabelValues {
  const values = {
    entity: dataPoint.attribute.name,
    value: dataPoint.formattedValue,
  };
  const isDataPointSingle = isSingleCardinalityDataPoint(dataPoint);
  return {
    stringTranslationKey: `app.contextMenu.investigation.label.${
      isDataPointSingle ? 'single' : 'collection'
    }`,
    values,
  };
}
