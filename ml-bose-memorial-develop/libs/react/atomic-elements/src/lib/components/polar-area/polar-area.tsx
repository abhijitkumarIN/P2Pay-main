import React, { ReactElement } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import VariablePie from 'highcharts/modules/variable-pie';
import { VisualizationWidgetProps } from '@kleeen/types';
import { clone } from 'ramda';
import { getOptions } from './options';

function KsPolarAreaBase(props: VisualizationWidgetProps & HighchartsReact.Props): ReactElement {
  const { context, onDataPointClickEvent, params } = props;
  const results = context.data?.results || [];
  const format = context.data?.format || {};

  const options = getOptions({ format, onDataPointClickEvent, params, props, results });
  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      containerProps={containerProps}
      highcharts={VariablePie(Highcharts)}
      options={clone(options)}
      {...props}
    />
  );
}

export const KsPolarArea = React.memo(KsPolarAreaBase);
