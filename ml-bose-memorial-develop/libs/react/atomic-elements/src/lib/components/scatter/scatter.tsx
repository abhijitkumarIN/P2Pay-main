import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { getOptions } from './options';

function KsScatterBase({
  attributes,
  containerProps,
  context,
  params,
  ...rest
}: VisualizationWidgetProps & HighchartsReact.Props): JSX.Element {
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const options = getOptions({
    attributes,
    format,
    params,
    results,
  });

  const containerPropsPlus = { ...containerProps, style: { height: '100%', width: '100%' } };

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      containerProps={containerPropsPlus}
      highcharts={Highcharts}
      options={clone(options)}
      {...rest}
    />
  );
}

export const KsScatter = React.memo(KsScatterBase);
