import { Widget } from '@kleeen/types';
import { clone } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function addCurrentWidgetTypeToViableSolutions(widget: Widget): Widget {
  const resultWidget = clone(widget);

  // *If the Widget does not have viableSolutions, add the chartType as the only one.
  if (isNilOrEmpty(resultWidget.viableSolutions)) {
    resultWidget.viableSolutions = [resultWidget.chartType];

    return resultWidget;
  }

  const widgetChartTypeIsNotIncludedAsViableSolution = !resultWidget.viableSolutions.includes(
    resultWidget.chartType,
  );

  // *If the Widget does not have the chartType as a viableSolution, add it to the very beginning.
  if (widgetChartTypeIsNotIncludedAsViableSolution) {
    resultWidget.viableSolutions.unshift(resultWidget.chartType);
  }

  return resultWidget;
}
