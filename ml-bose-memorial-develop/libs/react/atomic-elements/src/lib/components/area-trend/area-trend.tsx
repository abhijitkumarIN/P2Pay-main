import { Attribute, VisualizationWidgetProps } from '@kleeen/types';
import React, { useEffect, useState } from 'react';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import { isNilOrEmpty } from '@kleeen/common/utils';
import merge from 'lodash.merge';

type AreaTrendProps = VisualizationWidgetProps &
  HighchartsReact.Props & { legend?: Highcharts.LegendOptions };

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
    labels: {
      style: {
        color: 'hsl(var(--on-surface-color-hsl), .5)',
      },
    },
    gridLineColor: 'hsl(var(--on-surface-color-hsl), .2)',
    gridLineDashStyle: 'Dash',
    tickColor: 'var(--transparent)',
    endOnTick: false,
    tickAmount: 4,
  },
  xAxis: {
    labels: {
      style: {
        color: 'hsl(var(--on-surface-color-hsl), .5)',
      },
    },
  },
} as Highcharts.Options);

function KsAreaTrendBase({
  attributes,
  context,
  legend = { enabled: false },
  params,
  ...props
}: AreaTrendProps) {
  const results = pathOr([], ['results'], context.data);
  const series = pathOr([], ['series'], context.data);
  const format = pathOr({}, ['format'], context.data);

  const yAxis = pathOr({}, ['yAxis'], format);
  const containerProps = pathOr({}, ['containerProps'], props);

  const options = getOptions(results, format, { ...baseOptions, legend }, params);

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };
  const [chartOptions, setChartOptions] = useState(null);
  useEffect(() => {
    if (isNilOrEmpty(results)) return;
    const newChartOptions = !isNilOrEmpty(series)
      ? getAreaOptionsForSeries({ attributes, options, series, yAxisType: yAxis.type })
      : getAreaOptionsForResults({ options, results, yAxisType: yAxis.type });

    setChartOptions(newChartOptions);
    return () => {
      setChartOptions(null);
    };
  }, [results, series?.length]);

  if (context.isLoading) {
    return <Loader />;
  }

  return chartOptions !== null ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(chartOptions)}
      {...props}
      containerProps={containerSettings}
    />
  ) : null;
}

type HighchartSeries = Pick<Highcharts.SeriesAreaOptions, 'data' | 'name'>;

interface GetSeriesProps {
  attributes: Attribute[];
  series: HighchartSeries[];
}

function getSeries({
  attributes,
  series,
}: GetSeriesProps): (Highcharts.SeriesAreaOptions | Highcharts.SeriesLineOptions)[] {
  const [, yAxisAttribute] = attributes;
  const [primarySeries, secondarySeries] = series;
  const decoratedSeries = [];

  if (!isNilOrEmpty(primarySeries) && !isNilOrEmpty(yAxisAttribute)) {
    const decoratedPrimarySeries: Highcharts.SeriesAreaOptions = {
      name: yAxisAttribute.label || '',
      color: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, `hsl(var(--viz4), 1)`],
          [1, `hsl(var(--viz2), 1)`],
        ],
      },
      ...primarySeries,
      type: 'area',
    };
    decoratedSeries.push(decoratedPrimarySeries);
  }

  if (!isNilOrEmpty(secondarySeries)) {
    const decoratedSecondarySeries: Highcharts.SeriesLineOptions = {
      color: 'hsl(var(--on-surface-color-hsl), .4)',
      dashStyle: 'ShortDot',
      name: 'Trend',
      ...secondarySeries,
      type: 'line',
    };

    decoratedSeries.push(decoratedSecondarySeries);
  }
  return decoratedSeries;
}

interface GetAreaOptionsProps {
  options: Partial<Highcharts.Options>;
  yAxisType: Highcharts.AxisTypeValue;
}

interface GetAreaOptionsForResultsProps extends GetAreaOptionsProps {
  results: any[];
}

function getAreaOptionsForResults({
  options,
  results,
  yAxisType,
}: GetAreaOptionsForResultsProps): Highcharts.Options {
  const optionsWithResults = merge<Highcharts.Options, Highcharts.Options, Highcharts.Options>({}, options, {
    yAxis: {
      type: yAxisType,
    },
    series: [{ type: 'area', data: results }],
  });
  return optionsWithResults;
}

interface GetAreaOptionsForSeriesProps extends GetAreaOptionsProps {
  attributes: Attribute[];
  series: HighchartSeries[];
}

function getAreaOptionsForSeries({
  attributes,
  options,
  series,
  yAxisType,
}: GetAreaOptionsForSeriesProps): Highcharts.Options {
  const optionsWithResults = merge<Highcharts.Options, Highcharts.Options, Highcharts.Options>({}, options, {
    yAxis: {
      type: yAxisType,
    },
    series: getSeries({ attributes, series }),
  });
  return optionsWithResults;
}

export const KsAreaTrend = React.memo(KsAreaTrendBase);
