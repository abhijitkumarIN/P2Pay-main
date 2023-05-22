import { RadialDataParserResult } from '../../hooks';
import { getRadialSharedOptions } from '../../utils';
import merge from 'lodash.merge';

interface GetOptions {
  parsedRadialData: RadialDataParserResult;
}

// TODO: @cafe This should be handled like a proper hook
export function getOptions({ parsedRadialData }: GetOptions) {
  const baseOptions = getRadialSharedOptions(parsedRadialData);

  const pieOptions: Highcharts.Options = {
    plotOptions: {
      pie: {
        innerSize: 0,
      },
    },
  };

  const options = merge({}, baseOptions, pieOptions);
  return options;
}
