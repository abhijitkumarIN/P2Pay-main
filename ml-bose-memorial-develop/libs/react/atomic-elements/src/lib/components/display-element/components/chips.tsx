import { KsClickableChipsCell, KsListingModal } from '@kleeen/react/components';

import { DisplayComponentProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useState } from 'react';

export function Chips({ attribute, chartType, format, params, value, widgetId }: DisplayComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: @cafe add i18n key for this
  // TODO: @cafe find a way to get the displayDataPoint and pass it to KsClickableChipsCell
  if (isNilOrEmpty(value)) {
    return <>{'No values'}</>;
  }

  return (
    <>
      <KsClickableChipsCell
        attribute={attribute}
        cellItems={value}
        chartType={chartType}
        columnLabel={attribute.label}
        format={format}
        isIdTemporary={false}
        openShowMoreModal={() => setIsOpen(true)}
        params={params}
        widgetId={widgetId}
      />
      {isOpen && (
        <KsListingModal
          attribute={attribute}
          chartType={chartType}
          columnLabel={attribute.label}
          data={value}
          format={format}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          widgetId={widgetId}
        />
      )}
    </>
  );
}
