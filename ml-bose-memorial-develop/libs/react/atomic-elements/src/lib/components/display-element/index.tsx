import {
  getAttributeBackendFormat,
  getAttributeFormat,
  getAttributeFormatType,
  getAttributeTransformation,
  getFormat,
} from '../../utils/format';

import { DisplayElementProps } from './display-element.model';
import { Loader } from '@kleeen/react/components';
import { getDisplayElement } from './display-element-catalog';
import { useAttributeValue } from '../../hooks';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function DisplayElement({
  attribute,
  chartType,
  data,
  elements,
  isLoading,
  params,
  widgetId,
}: DisplayElementProps) {
  const attributeValue = useAttributeValue({
    attribute,
    data,
    isDisplay: true,
    isLoading,
  });

  const attributeFormat = getAttributeFormat(params);
  const attributeFormatType = getAttributeFormatType(params);
  const attributeTransformation = getAttributeTransformation(params);
  const backendFormat = getAttributeBackendFormat(attribute.name)(data);
  const format = getFormat({ attributeFormat, backendFormat });

  if (isLoading) {
    return <Loader />;
  }

  if (isNilOrEmpty(attributeValue)) {
    return null;
  }

  const { displayComponent } = elements;
  const DisplayComponent = getDisplayElement(displayComponent);

  return (
    <DisplayComponent
      attribute={attribute}
      chartType={chartType}
      element={displayComponent}
      format={format}
      formatType={attributeFormatType}
      params={params}
      transformation={attributeTransformation}
      value={attributeValue}
      widgetId={widgetId}
    />
  );
}
