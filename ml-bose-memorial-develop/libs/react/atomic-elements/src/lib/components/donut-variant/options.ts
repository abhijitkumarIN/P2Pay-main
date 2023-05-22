import { HighchartsLegendClickEvent, getRadialSharedOptions, showDrillUpButton } from '../../utils';

import { OnDataPointClick } from '@kleeen/types';
import merge from 'lodash.merge';
import { vizColors } from '../generalBaseOptions';

interface GetOptions {
  backButtonRef: any;
  firstSliceOfResults: any;
  highChartUpdate: any;
  localization: any;
  onDataPointClickEvent: OnDataPointClick;
  parsedRadialData: any;
}

// TODO: @cafe This should be handled like a proper hook
export const getOptions = ({
  backButtonRef,
  firstSliceOfResults,
  highChartUpdate,
  localization,
  onDataPointClickEvent,
  parsedRadialData,
}: GetOptions) => {
  const baseOptions = getRadialSharedOptions(parsedRadialData);

  const donutVariantOptions: Highcharts.Options = {
    series: [
      {
        colors: vizColors.lightFade,
        data: firstSliceOfResults,
        enableMouseTracking: false,
        innerSize: 130,
        size: 138,
        showInLegend: false,
        type: 'pie',
      },
      {
        data: firstSliceOfResults,
        events: {
          click(e) {
            const { selected, index: selectedIndex } = e.point;
            this.chart.series[0].points[selectedIndex].select(!selected, true);
            this.chart.series[1].points[selectedIndex].select(!selected, true);
            if (typeof onDataPointClickEvent === 'function') {
              onDataPointClickEvent(e);
            }
            setTimeout(() => {
              if (highChartUpdate?.drillUpButton) {
                showDrillUpButton({
                  highChartUpdate,
                  backButtonRef,
                });
              }
            });
            return false;
          },
        },
        innerSize: 138,
        size: 160,
        type: 'pie',
      },
    ],
    legend: {
      itemStyle: {
        fontSize: 'var(--tx-M)',
      },
      align: 'left',
      itemMarginBottom: 4,
      itemMarginTop: 4,
    },
    plotOptions: {
      pie: {
        innerSize: 130,
        size: 160,
        point: {
          events: {
            legendItemClick(e: HighchartsLegendClickEvent) {
              // This legendItemClick event overrides the one from getBaseOptions
              if (e.target.name !== localization.restOfResultsLabel) {
                return false;
              }

              const hcEventTarget = e.target.hcEvents.click[0];
              hcEventTarget.fn();
              if (highChartUpdate?.drillUpButton) {
                showDrillUpButton({ highChartUpdate, backButtonRef });
              }
            },
          },
        },
      },
    },
  };

  return merge({}, baseOptions, donutVariantOptions);
};
