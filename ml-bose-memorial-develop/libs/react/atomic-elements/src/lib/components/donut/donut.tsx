import './donut.scss';

import { KsButton, Loader } from '@kleeen/react/components';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import { drillUp } from '../../utils';
import drilldown from 'highcharts/modules/drilldown';
import { getOptions } from './options';
import { useRadialDataParser } from '../../hooks';

const bem = 'ks-donut';

drilldown(Highcharts);

function KsDonutBase(props: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const parsedRadialData = useRadialDataParser(props);

  const isLoading = pathOr(true, ['context', 'isLoading']);
  if (isLoading(props)) {
    return <Loader />;
  }

  const {
    backButtonRef,
    containerProps,
    highchartState: { highChartUpdate, setHighChartUpdate },
    localization,
    results: { aggregations, formattedResults },
  } = parsedRadialData;

  const options = getOptions(aggregations, formattedResults, parsedRadialData);

  return (
    <div className={classnames(bem, 'High-charts')}>
      <div ref={backButtonRef} className={classnames(`${bem}__back`, 'back-to')}>
        <KsButton
          onClick={() => {
            drillUp({ backButtonRef, highChartUpdate });
          }}
        >
          ◁ {localization.backTo}
        </KsButton>
      </div>
      <HighchartsReact
        containerProps={containerProps}
        highcharts={Highcharts}
        options={clone(options)}
        {...props}
        callback={(e) => {
          setHighChartUpdate(e);
        }}
      />
    </div>
  );
}

export const KsDonut = React.memo<VisualizationWidgetProps & HighchartsReact.Props>(
  KUIConnect(({ translate }) => ({ translate }))(KsDonutBase),
);
