import { addDonutSubTitle, addDonutTitle, getRadialSharedOptions } from '../../utils';

import { getAggregationLabel } from '../../../types';
import { isEmpty } from 'ramda';
import { isValidArray } from '@kleeen/common/utils';
import merge from 'lodash.merge';

// TODO: @cafe This should be handled like a proper hook
export const getOptions = (aggregations, formattedResults, parsedRadialData) => {
  const dTitle = getAverageForAll(formattedResults),
    dSubtitle = getAggregationLabel(aggregations, true) || null;

  const baseOptions = getRadialSharedOptions(parsedRadialData);
  const donutOptions: Highcharts.Options = {
    chart: {
      events: {
        load() {
          if (!isEmpty(dTitle)) {
            addDonutTitle(this, dTitle.toString());
          }
          if (!isEmpty(dSubtitle)) {
            addDonutSubTitle(this, dSubtitle);
          }
        },
        redraw() {
          // TODO: @cafe move this into a generic function
          if (!isEmpty(dTitle)) {
            addDonutTitle(this, dTitle.toString());
          }
          if (!isEmpty(dSubtitle)) {
            addDonutSubTitle(this, dSubtitle);
          }
        },
      },
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
      },
    },
  };
  return merge({}, baseOptions, donutOptions);
};

//#region private members
function getAverageForAll(results: { y: number }[]) {
  if (!isValidArray(results)) {
    return 0;
  }

  const total = results.reduce((acc, curr) => acc + curr.y, 0);
  return Math.round(total / results.length);
}
//#endregion
