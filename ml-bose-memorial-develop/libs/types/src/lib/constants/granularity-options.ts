import { TemporalBucket } from '../types';
import { TemporalInterval } from '../enums';

export const granularityOptions: TemporalBucket[] = [
  {
    interval: TemporalInterval.Day,
    magnitude: 1,
  },
  {
    interval: TemporalInterval.Week,
    magnitude: 1,
  },
  {
    interval: TemporalInterval.Month,
    magnitude: 1,
  },
  {
    interval: TemporalInterval.Quarter,
    magnitude: 1,
  },
  {
    interval: TemporalInterval.Year,
    magnitude: 1,
  },
];
