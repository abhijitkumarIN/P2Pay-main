import './column-bar.scss';

import { VisualizationWidgetProps, WidgetTypes } from '@kleeen/types';
import { clone, has, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsHighstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
  },
} as Highcharts.Options);

function KsColumnBarBase(props: VisualizationWidgetProps & HighchartsReact.Props): JSX.Element {
  const { context, onDataPointClickEvent, params, widgetId = '' } = props;
  const containedIn = pathOr('visualization', ['containedIn'], props);
  const subType = pathOr('default', ['subType'], props);
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const xAxis = clone(pathOr({}, ['xAxis'], format));
  const containerProps = pathOr({}, ['containerProps'], props);
  const vizColors: Array<string> = generalBaseOptions.colors.slice(0, 10);
  const crossLinking = props.context?.data?.crossLinking || [];

  if (!has('key', xAxis)) {
    xAxis['key'] = widgetId;
  }

  const options: Highcharts.Options = getOptions({
    baseOptions,
    containedIn,
    crossLinking,
    format,
    onDataPointClickEvent,
    params,
    results,
    subType,
    vizColors,
    xAxis,
  });

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };

  /** HighchartsHighstock is only used in this case for the builtin navigator*/
  const renderNavigator = subType === WidgetTypes.COLUMN_BAR_MACRO_MICRO;

  if (context.isLoading) {
    return <Loader />;
  }
  return (
    <HighchartsReact
      highcharts={renderNavigator ? HighchartsHighstock : Highcharts}
      options={clone(options)}
      constructorType={renderNavigator ? 'stockChart' : false}
      {...props}
      containerProps={containerSettings}
      key={`column-${props.params?.operationName}${subType}`}
    />
  );
}

export const KsColumnBar = React.memo(KsColumnBarBase);
