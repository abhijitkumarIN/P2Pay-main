import { VisualizationWidgetProps, WidgetProps, WidgetTypes } from '@kleeen/types';

import { KsArea } from '../../area';
import { KsAreaGradient } from '../../area-gradient';
import { KsAreaMacroMicro } from '../../area-macro-micro';
import { KsAreaMasterDetail } from '../../area-master-detail';
import { KsAreaTrend } from '../../area-trend';
import { Loader } from '@kleeen/react/components';
import { areaTrendLegend } from '../../generalBaseOptions';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './area-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

function AreaWidgetSubtype({ attributes, chartType, context, params, widgetId }): JSX.Element {
  const props: VisualizationWidgetProps = {
    attributes,
    context,
    chartType,
    params,
    widgetId,
  };
  // TODO: @cafe Turn this into a map
  switch (chartType) {
    case WidgetTypes.AREA_GRADIENT:
      return <KsAreaGradient {...props} />;
    case WidgetTypes.AREA_MASTER_DETAIL:
      return <KsAreaMasterDetail {...props} />;
    case WidgetTypes.AREA_MACRO_MICRO:
      return <KsAreaMacroMicro {...props} />;
    case WidgetTypes.AREA_TREND:
      return <KsAreaTrend {...props} legend={areaTrendLegend} />;
    default:
    case WidgetTypes.AREA:
      return <KsArea {...props} />;
  }
}

export function AreaWidget({ attributes, chartType, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({ params, taskName, widgetId });
  const classes = useStyles();

  if (isNilOrEmpty(widgetData)) {
    return <Loader />;
  }

  return (
    <div
      className={
        chartType === WidgetTypes.AREA_MACRO_MICRO ? classes.widgetMacroMicroContent : classes.widgetContent
      }
    >
      <AreaWidgetSubtype
        attributes={attributes}
        chartType={chartType}
        context={widgetData}
        params={params}
        widgetId={widgetId}
      />
    </div>
  );
}
