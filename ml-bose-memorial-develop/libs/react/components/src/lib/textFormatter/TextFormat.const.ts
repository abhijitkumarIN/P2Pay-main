import { RestrictionProps } from './TextFormat.model';
import { Transformation } from '@kleeen/types';

export const Restriction: RestrictionProps = {
  [Transformation.AlphabeticalBucket]: true,
  [Transformation.AlphaTier]: true,
  [Transformation.Average]: true,
  [Transformation.Bucket]: true,
  [Transformation.ChangeCount]: true,
  [Transformation.ChangePercent]: true,
  [Transformation.CountTotal]: true,
  [Transformation.CountUnique]: true,
  [Transformation.CustomAggregation]: true,
  [Transformation.CustomCount]: true,
  [Transformation.CustomTrend]: true,
  [Transformation.Max]: false,
  [Transformation.MedianMiddl]: true,
  [Transformation.Min]: false,
  [Transformation.ModeFrequent]: false,
  [Transformation.SelfMulti]: false,
  [Transformation.SelfSingle]: false,
  [Transformation.Sum]: true,
  [Transformation.Tier]: true,
  [Transformation.Unique]: false,
};
