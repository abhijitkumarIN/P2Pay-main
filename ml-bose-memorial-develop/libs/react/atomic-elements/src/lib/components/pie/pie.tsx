import './pie.scss';

import { KsButton, Loader } from '@kleeen/react/components';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import { clone } from 'ramda';
import { drillUp } from '../../utils';
import drilldown from 'highcharts/modules/drilldown';
import { getOptions } from './options';
import { useRadialDataParser } from '../../hooks/useRadialDataParser';

const bem = 'ks-pie-chart';

drilldown(Highcharts);

function KsPieBase(props: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const { context } = props;
  const parsedRadialData = useRadialDataParser(props);

  if (context.isLoading) {
    return <Loader />;
  }

  const {
    backButtonRef,
    containerProps,
    highchartState: { highChartUpdate, setHighChartUpdate },
    localization,
  } = parsedRadialData;

  const options = getOptions({
    parsedRadialData,
  });

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
export const KsPie = React.memo<VisualizationWidgetProps & HighchartsReact.Props>(
  KUIConnect(({ translate }) => ({ translate }))(KsPieBase),
);
