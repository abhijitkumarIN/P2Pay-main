import { OnDataPointClick, VisualizationWidgetProps, VizParams } from '@kleeen/types';
import { generalBaseOptions, maxLabelLength, radialCrosshair, radialLegend } from '../generalBaseOptions';

import { formatRadialResults } from '@kleeen/frontend/utils';
import merge from 'lodash.merge';
import { pathOr } from 'ramda';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

interface GetOptions {
  format: Record<string, unknown>;
  onDataPointClickEvent: OnDataPointClick;
  params: VizParams;
  props: VisualizationWidgetProps;
  results: any;
}

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  chart: {
    type: 'variablepie',
    marginBottom: 0,
    marginTop: 0,
  },
  plotOptions: {
    variablepie: {
      borderWidth: 0.5,
    },
  },
  legend: radialLegend,
  tooltip: {
    pointFormat: '{point.name}: {point.y}',
  },
});

// TODO: @cafe This should be handled like a proper hook
export const getOptions = ({ format, onDataPointClickEvent, params, props, results }: GetOptions) => {
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);
  const crossLinking = props.context?.data?.crossLinking || [];
  const formattedResults = formatRadialResults(results, xAxis, true, crossLinking, yAxis);
  // TODO: prefix and suffix

  const { groupBy } = params;

  return {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxis,
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
    },
    series: [
      {
        data: formattedResults,
        point: radialCrosshair,
        events: {
          click: (e) => {
            if (typeof onDataPointClickEvent === 'function') {
              onDataPointClickEvent(e);
            }
          },
        },
      },
    ],
    legend: {
      ...baseOptions.legend,
      labelFormatter() {
        if (groupBy.formatType === 'timestamp') {
          return formatterGroupByForTooltip(this.name);
        }
        const name = formatterGroupBy(this.name) as string;
        return name.length > maxLabelLength
          ? [...name].splice(0, maxLabelLength).join('').trim() + '...'
          : name;
      },
    },
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.name)}: ${formatterValue(this.point.y)}`;
      },
    },
  };
};
