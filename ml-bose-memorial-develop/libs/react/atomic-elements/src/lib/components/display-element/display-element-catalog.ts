import {
  BinaryView,
  Chips,
  Label,
  LabelWithChange,
  SparklineMaxLargest,
  TrendSparkline,
  TrendSparklineHighLow,
  TrendSparklineVsEnd,
  TrendSparklineVsStart,
} from './components';
import { DisplayCatalog, DisplayElement, ElementDisplayType, Maybe } from '@kleeen/types';

const displayCatalog: DisplayCatalog = {
  [ElementDisplayType.BinaryView]: BinaryView,
  [ElementDisplayType.Chips]: Chips,
  [ElementDisplayType.Label]: Label,
  [ElementDisplayType.LabelWithChange]: LabelWithChange,
  [ElementDisplayType.SparklineMaxLargest]: SparklineMaxLargest,
  [ElementDisplayType.TrendSparkline]: TrendSparkline,
  [ElementDisplayType.TrendSparklineHighLow]: TrendSparklineHighLow,
  [ElementDisplayType.TrendSparklineVsEnd]: TrendSparklineVsEnd,
  [ElementDisplayType.TrendSparklineVsStart]: TrendSparklineVsStart,
};

export function getDisplayElement(displayComponent: ElementDisplayType): Maybe<DisplayElement> {
  return displayCatalog[displayComponent];
}
