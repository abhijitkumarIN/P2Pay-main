import { Attribute, StatisticalDataType, VizParams } from '@kleeen/types';

import { formatAxis } from '@kleeen/frontend/utils';
import { generalBaseOptions } from '../generalBaseOptions';
import { getSeverityLevelFormatter } from '../../utils';
import merge from 'lodash.merge';
import { pathOr } from 'ramda';
import { useTextFormattersForViz } from '@kleeen/react/hooks';
import { isNilOrEmpty } from '@kleeen/common/utils';
import Highcharts from 'highcharts';

interface GetOptions {
  attributes: Attribute[];
  format: Record<string, unknown>;
  params: VizParams;
  results: any;
}

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  chart: { type: 'scatter' },
  colors: ['hsl(var(--viz1), .6)'],
} as Highcharts.Options);

const getSeries = ({ attributes, results }: Pick<GetOptions, 'attributes' | 'results'>) => {
  const severityLevelAttribute = attributes.find(
    (attr) => attr.statisticalType === StatisticalDataType.OrderedSeverityRanking,
  );
  const isSeverityLevel = !isNilOrEmpty(severityLevelAttribute);

  const { parsedResults } =
    isSeverityLevel && getSeverityLevelFormatter({ attribute: severityLevelAttribute, results });
  const convertedResults = isSeverityLevel ? parsedResults : results;
  return [{ name: '', data: convertedResults }];
};

// TODO: @cafe This should be handled like a proper hook
export const getOptions = ({ attributes, format, params, results }: GetOptions) => {
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);

  const seriesData = getSeries({ attributes, results });

  const xAxisLabel =
    xAxis?.type !== 'datetime'
      ? {
          ...baseOptions.xAxis['labels'],
          formatter(this) {
            return formatterGroupBy(this.value);
          },
        }
      : {
          ...baseOptions.xAxis['labels'],
          formatter(this) {
            return Highcharts.dateFormat("%b '%y", this.value);
          },
        };

  const xAxisValues = formatAxis(xAxis);

  return {
    ...baseOptions,
    series: seriesData,
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxisValues,
      type: xAxis.type,
      labels: {
        ...xAxisLabel,
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      type: yAxis.type,
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.category)}: ${formatterValue(this.point.y)}`;
      },
    },
  };
};
