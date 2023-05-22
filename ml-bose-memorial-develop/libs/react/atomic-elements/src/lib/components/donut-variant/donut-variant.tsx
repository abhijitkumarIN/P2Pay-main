import './donut-variant.scss';

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
import { useRadialDataParser } from '../../hooks';

const bem = 'ks-donut-variant';

drilldown(Highcharts);

function KsDonutVariantBase(props: VisualizationWidgetProps & HighchartsReact.Props): React.ReactElement {
  const parsedRadialData = useRadialDataParser(props);
  const { context, onDataPointClickEvent } = props;

  if (context.isLoading) {
    return <Loader />;
  }

  const {
    backButtonRef,
    containerProps,
    highchartState: { highChartUpdate, setHighChartUpdate },
    localization,
    results: { firstSliceOfResults },
  } = parsedRadialData;

  const options = getOptions({
    backButtonRef,
    firstSliceOfResults,
    highChartUpdate,
    localization,
    onDataPointClickEvent,
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
      <div className={classnames(`${bem}__shadow`, 'donut-shadow')}></div>
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

export const KsDonutVariant = React.memo(KUIConnect(({ translate }) => ({ translate }))(KsDonutVariantBase));
