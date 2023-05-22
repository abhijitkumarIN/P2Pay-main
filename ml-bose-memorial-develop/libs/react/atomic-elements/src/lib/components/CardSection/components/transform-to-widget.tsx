/* eslint-disable complexity */
import {
  AreaWidget,
  BubbleChartWidget,
  ColumnBarWidget,
  ConfigInputWidget,
  ConfigTableWidget,
  CustomActionWidget,
  CustomWidgetContainer,
  DonutVariantWidget,
  DonutWidget,
  GaugeWidget,
  LineWidget,
  PieWidget,
  PolarAreaWidget,
  PositiveNegativeAreaWidget,
  RankedListWidget,
  ReadOnlyTextWidget,
  ScatterWidget,
  SimpleListWidget,
  SingleBarHighlightMaxWidget,
  StepLineWidget,
  SummaryStatisticsWidget,
  SummaryWidget,
  WaterfallWidget,
} from '../../widgets';
import { CardWidgetProps, RenderWidgetProps, WidgetHeaderType } from '../CardWidget.model';
import { OnInputChangeEvent, RegisterEvents, Widget, WidgetProps, WidgetTypes } from '@kleeen/types';
import { ReactElement, useState } from 'react';
import { WidgetProvider, getWidgetContextName, useKleeenActions } from '@kleeen/react/hooks';

import CardWidget from '../CardWidget';
import { ErrorBoundaryComponent } from '@kleeen/react/components';
import { GridAreaSection } from '../../grid-area-section';
import { WidgetHeader as StandardWidgetHeader } from './widget-header';
import { VisualizationSelector } from '../../visualization-selector';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface TransformToWidgetComponentProps {
  disableHeightCalculation?: boolean;
  hideSaveAndClose?: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  taskName: string;
  widget: Widget;
  CardWidgetElement?: (props: CardWidgetProps) => JSX.Element;
  WidgetHeader?: WidgetHeaderType;
}

export function TransformToWidgetComponent({
  disableHeightCalculation = false,
  hideSaveAndClose,
  onInputChange,
  registerEvents,
  taskName,
  widget,
  CardWidgetElement = CardWidget,
  WidgetHeader = StandardWidgetHeader,
}: TransformToWidgetComponentProps): ReactElement | null {
  const widgetContext = getWidgetContextName({ taskName, widgetId: widget.id });
  const actions = useKleeenActions(widgetContext);
  const [selectedWidgetType, setSelectedWidgetType] = useState<WidgetTypes | null>(() => {
    const { selectedViableSolution, viableSolutions } = widget;

    if (isNilOrEmpty(viableSolutions)) {
      return null;
    }

    const selectedViableSolutionIsIncludedAsViableSolution = viableSolutions.includes(selectedViableSolution);

    if (selectedViableSolutionIsIncludedAsViableSolution) {
      return selectedViableSolution;
    }

    const [firstViableSolution] = viableSolutions;

    return firstViableSolution;
  });

  if (widget.chartType === WidgetTypes.CUSTOM) {
    return renderWidget({
      disableHeightCalculation,
      onInputChange,
      registerEvents,
      selectedWidgetType,
      taskName,
      widget,
      WidgetHeader,
    });
  }

  const showViableSelector = widget?.viableSolutions?.length > 1;
  const widgetWithSelectedViableSolution = {
    ...widget,
    selectedViableSolution: selectedWidgetType,
  };

  return (
    <WidgetProvider value={widgetWithSelectedViableSolution}>
      <CardWidgetElement
        disableHeightCalculation={disableHeightCalculation}
        icon={false}
        selectedViz={selectedWidgetType}
        title={widget.title}
        widgetSelector={
          showViableSelector && (
            <VisualizationSelector
              items={widget?.viableSolutions}
              onClick={setSelectedWidgetType}
              selectedVisualization={selectedWidgetType}
            />
          )
        }
        Header={
          <WidgetHeader
            actions={actions}
            title={widget.title}
            widget={widgetWithSelectedViableSolution}
            hasTooltip
          />
        }
      >
        <ErrorBoundaryComponent>
          {renderWidget({
            disableHeightCalculation,
            hideSaveAndClose,
            onInputChange,
            registerEvents,
            selectedWidgetType,
            taskName,
            widget,
          })}
        </ErrorBoundaryComponent>
      </CardWidgetElement>
    </WidgetProvider>
  );
}

//#region Private members
function renderWidget({
  disableHeightCalculation,
  hideSaveAndClose,
  onInputChange,
  registerEvents,
  selectedWidgetType,
  taskName,
  widget,
  WidgetHeader,
}: RenderWidgetProps): ReactElement | null {
  const { actions, attributes, id: widgetId, params, statisticalType } = widget;
  const widgetProps: WidgetProps = {
    actions,
    attributes,
    chartType: selectedWidgetType,
    params,
    taskName,
    widgetId,
  };

  switch (selectedWidgetType) {
    case WidgetTypes.AREA_GRADIENT:
    case WidgetTypes.AREA_MACRO_MICRO:
    case WidgetTypes.AREA_MASTER_DETAIL:
    case WidgetTypes.AREA_TREND:
    case WidgetTypes.AREA:
      return <AreaWidget {...widgetProps} />;

    case WidgetTypes.BUBBLE_CHART:
      return <BubbleChartWidget {...widgetProps} disableHeightCalculation={disableHeightCalculation} />;

    case WidgetTypes.COLUMN_BAR_DOUBLE_BAR:
    case WidgetTypes.COLUMN_BAR_MACRO_MICRO:
    case WidgetTypes.COLUMN_BAR_SEGMENTED:
    case WidgetTypes.COLUMN_BAR:
      return <ColumnBarWidget {...widgetProps} />;

    case WidgetTypes.CONFIG_INPUT_FIELD_USER_DEFINED:
      return (
        <ConfigInputWidget
          {...widgetProps}
          hideSaveAndClose={hideSaveAndClose}
          icon={false}
          onInputChange={onInputChange}
          registerEvents={registerEvents}
          statisticalType={statisticalType}
          title={widget.title}
        />
      );
    case WidgetTypes.CONFIG_TABLE:
      return (
        <ConfigTableWidget {...widgetProps} onInputChange={onInputChange} registerEvents={registerEvents} />
      );

    case WidgetTypes.CUSTOM: {
      return (
        <CustomWidgetContainer
          disableHeightCalculation={disableHeightCalculation}
          onInputChange={onInputChange}
          registerEvents={registerEvents}
          taskName={taskName}
          widget={widget}
          Header={<WidgetHeader title={widget.title} widget={widget} hasTooltip />}
        />
      );
    }

    case WidgetTypes.CUSTOM_ACTION:
      return <CustomActionWidget {...widgetProps} />;

    case WidgetTypes.DONUT:
      return <DonutWidget {...widgetProps} />;

    case WidgetTypes.DONUT_VARIANT:
      return <DonutVariantWidget {...widgetProps} />;

    case WidgetTypes.GAUGE_SEVERITY_LEVEL:
    case WidgetTypes.GAUGE_SEVERITY_SCORE:
    case WidgetTypes.GAUGE:
      return <GaugeWidget {...widgetProps} />;

    case WidgetTypes.LINE:
      return <LineWidget {...widgetProps} />;

    case WidgetTypes.PIE:
      return <PieWidget {...widgetProps} />;

    case WidgetTypes.POLAR_AREA:
      return <PolarAreaWidget {...widgetProps} />;

    case WidgetTypes.POSITIVE_NEGATIVE_AREA:
      return <PositiveNegativeAreaWidget {...widgetProps} />;

    case WidgetTypes.READ_ONLY_TEXT:
      return <ReadOnlyTextWidget {...widgetProps} />;

    case WidgetTypes.SCATTER:
      return <ScatterWidget {...widgetProps} />;

    case WidgetTypes.SIMPLE_LIST_RANKED:
      return <RankedListWidget {...widgetProps} />;

    /** TODO: Add subtype as in COLUMN_BAR */
    case WidgetTypes.SINGLE_BAR_HIGHLIGHT_MAX:
      return <SingleBarHighlightMaxWidget {...widgetProps} />;

    case WidgetTypes.STEP_LINE:
      return <StepLineWidget {...widgetProps} />;

    case WidgetTypes.SUMMARY:
    case WidgetTypes.SUMMARY_STATISTICS:
      return <SummaryStatisticsWidget {...widgetProps} />;

    case WidgetTypes.SUMMARY_SLOT:
      return <SummaryWidget {...widgetProps} />;

    case WidgetTypes.SIMPLE_LIST:
      return <SimpleListWidget {...widgetProps} />;

    case WidgetTypes.FULL_TABLE:
    case WidgetTypes.TABLE:
      return (
        <div className="report-table-height">
          <GridAreaSection
            className="report-table-height"
            columnWidth={100}
            entityId={widget.attributes[0].id.toString()}
            entityName={widget.params?.baseModel}
            key={`data-view-display-section-grid-area-section-${widget.id}`}
            sortableColumns={true}
            taskName={taskName}
            widget={widget}
          />
        </div>
      );

    case WidgetTypes.WATERFALL:
      return <WaterfallWidget {...widgetProps} />;

    default:
      return null;
  }
}
//#endregion
