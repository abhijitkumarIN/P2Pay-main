import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { clone } from 'ramda';
import { getOptions } from './options';

function KsPositiveNegativeAreaBase({
  context,
  params,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props) {
  const results = context?.data?.results || [];
  const format = context?.data?.format || {};

  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  const options = getOptions(results, format, params);
  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(options)}
      containerProps={containerProps}
      {...props}
    />
  );
}

export const KsPositiveNegativeArea = React.memo(KsPositiveNegativeAreaBase);
