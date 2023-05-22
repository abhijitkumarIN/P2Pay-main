import { DataPointWithFormattedValue } from '@kleeen/types';
import { ReactNode } from 'react';
import { isSingleCardinalityDataPoint } from '@kleeen/frontend/utils';

interface PreviewSectionLabelValues {
  stringTranslationKey: string;
  values: { entity: string; value: ReactNode };
}

export function getPreviewSectionLabel(dataPoint: DataPointWithFormattedValue): PreviewSectionLabelValues {
  const values = {
    entity: dataPoint.attribute.name,
    value: dataPoint.formattedValue,
  };
  const isDataPointSingle = isSingleCardinalityDataPoint(dataPoint);
  return {
    stringTranslationKey: `app.contextMenu.preview.label.${isDataPointSingle ? 'single' : 'collection'}`,
    values,
  };
}
