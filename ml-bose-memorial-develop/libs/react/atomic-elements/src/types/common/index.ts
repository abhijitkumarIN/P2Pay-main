import { isNil, propOr } from 'ramda';

import { Transformation } from '@kleeen/types';

export const getAggregationLabel = (transformation: string, withoutOf?: boolean): string => {
  if (isNil(transformation)) {
    return '';
  }
  const ofString = withoutOf ? '' : ' of';

  const aggregationMap = {
    [Transformation.Average]: `Average${ofString}`,
    [Transformation.ChangeCount]: `Change in Count ${ofString}`,
    [Transformation.ChangePercent]: `Change${ofString}`,
    [Transformation.CountTotal]: `Total Count${ofString}`,
    [Transformation.CountUnique]: `Unique Count${ofString}`,
    [Transformation.Latest]: `Latest${ofString}`,
    [Transformation.Max]: `Max${ofString}`,
    [Transformation.MaxSparkline]: `Max/Largest${ofString}`,
    [Transformation.Min]: `Min${ofString}`,
    [Transformation.Oldest]: `Oldest${ofString}`,
    [Transformation.SelfSingle]: '',
    [Transformation.Sum]: `Sum${ofString}`,
    [Transformation.TrendCountSparkline]: `Trend Count${ofString}`,
    [Transformation.TrendCountHighLowSparkline]: `Trend Count High/Low${ofString}`,
    [Transformation.TrendCountVsEndSparkline]: `Trend Count vs End${ofString}`,
    [Transformation.TrendCountVsStartSparkline]: `Trend Count vs Start${ofString}`,
    [Transformation.TrendSparkline]: `Trend${ofString}`,
    [Transformation.TrendHighLowSparkline]: `Trend High/Low${ofString}`,
    [Transformation.TrendVsEndSparkline]: `Trend vs End${ofString}`,
    [Transformation.TrendVsStartSparkline]: `Trend vs Start${ofString}`,
  };

  return propOr('', transformation)(aggregationMap);
};

export function getFullLabel({
  label,
  transformation,
  withoutOf = false,
}: {
  label: string;
  transformation: string;
  withoutOf?: boolean;
}): string {
  return `${getAggregationLabel(transformation, withoutOf)} ${label}`;
}
