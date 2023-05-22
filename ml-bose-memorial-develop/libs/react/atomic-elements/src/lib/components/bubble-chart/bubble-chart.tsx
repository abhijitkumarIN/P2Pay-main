import { TranslateProps, VisualizationWidgetProps } from '@kleeen/types';
import { clone, has, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsColorAxis from 'highcharts/modules/coloraxis';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import more from 'highcharts/highcharts-more';

more(Highcharts);
HighchartsColorAxis(Highcharts);

function KsBubbleChartBase({
  translate,
  ...props
}: VisualizationWidgetProps & TranslateProps & HighchartsReact.Props): React.ReactElement {
  const { context, onDataPointClickEvent, params, widgetId = '' } = props;
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const xAxis = clone(pathOr({}, ['xAxis'], format));
  const { isLoading } = context;
  if (!has('key', xAxis)) {
    xAxis['key'] = widgetId;
  }
  const crossLinking = props.context?.data?.crossLinking || [];

  const options: Highcharts.Options = getOptions({
    results,
    format,
    baseOptions: generalBaseOptions,
    params,
    crossLinkingMatrix: crossLinking,
    onDataPointClickEvent,
  });

  const containerPropsPlus = {
    ...props,
    style: { height: '100%', width: props.bigWidget ? '50%' : '100%' },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <HighchartsReact
          containerProps={containerPropsPlus}
          highcharts={Highcharts}
          key={`bubble-chart-${props.bigWidget.toString()}`}
          options={clone(options)}
          {...props}
        />
      )}
    </>
  );
}

export const KsBubbleChart = React.memo<VisualizationWidgetProps & HighchartsReact.Props>(KsBubbleChartBase);
