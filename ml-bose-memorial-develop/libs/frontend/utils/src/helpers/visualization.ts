import { Attribute, DataPoint, DataPointValue } from '@kleeen/types';

import Highcharts from 'highcharts';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { path } from 'ramda';

interface GetDataPointsFromHighchartsEventClick {
  attributes: Attribute[];
  event: Highcharts.SeriesClickEventObject;
}

export function getDataPointsFromHighchartsEventClick({
  attributes,
  event,
}: GetDataPointsFromHighchartsEventClick): DataPoint[] {
  const [firstAttribute, secondAttribute] = attributes;
  const value = firstAttribute && path<DataPointValue>(['point', 'options', firstAttribute.name], event);

  if (isNilOrEmpty(value)) return [];

  const dataPoints: DataPoint[] = [
    {
      attribute: firstAttribute,
      value,
    },
  ];

  if (!isNilOrEmpty(secondAttribute)) {
    const contextValue = path<DataPointValue>(['point', 'options', secondAttribute.name], event);

    if (!isNilOrEmpty(contextValue)) {
      dataPoints.push({
        attribute: secondAttribute,
        value: contextValue,
      });
    }
  }

  return dataPoints;
}
