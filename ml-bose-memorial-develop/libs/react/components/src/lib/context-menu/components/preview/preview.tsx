import {
  ContextMenuClickHandler,
  ContextMenuSectionItem,
  ContextMenuSectionProps,
} from '../../context-menu.model';
import { DataPointWithFormattedValue, ReactElement, VizParams, Widget, WidgetScope } from '@kleeen/types';
import { PreviewPanelActions, usePreviewPanelActions } from '@kleeen/react/hooks';
import { entityHasWidgets, getWidgetsByEntity } from '@kleeen/widgets';
import { getContextDataPoints, getWidgetsDecoratedWithFilters } from '@kleeen/investigations';
import { useEffect, useState } from 'react';

import { ContextMenuItemView } from '../context-menu-item';
import { ContextMenuSection } from '../context-menu-section';
import { Translate } from '@kleeen/core-react';
import { getPreviewSectionLabel } from './utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { isSingleCardinalityDataPoint } from '@kleeen/frontend/utils';

export function KsContextMenuPreviewSection({
  dataPoints,
  dataPointsToShow,
  handleClose,
  widgetContextParams,
}: ContextMenuSectionProps) {
  const previewPanelActions = usePreviewPanelActions();
  const [previewSections, setPreviewSections] = useState<ContextMenuSectionItem[]>([]);

  useEffect(() => {
    if (isNilOrEmpty(dataPointsToShow)) {
      return;
    }

    const tempPreviewSections = dataPointsToShow.reduce(
      (acc: ContextMenuSectionItem[], dataPointToShow, dataPointToShowIndex) => {
        const previewItems = getPreviewItems({
          dataPointToShow,
          dataPoints,
          widgetContextParams,
        });

        if (isNilOrEmpty(previewItems)) {
          return acc;
        }

        const { stringTranslationKey, values } = getPreviewSectionLabel(dataPointToShow);

        const previewSection = {
          key: `preview-${dataPointToShowIndex}`,
          label: <Translate id={stringTranslationKey} type="html" values={values} />,
          menuItems: previewItems.map((previewItem, previewItemIndex) => {
            return {
              handleClick: getClickHandler({
                handleClose,
                item: previewItem,
                previewPanelActions,
              }),
              key: `preview-${previewItem.scope}-${previewItemIndex}`,
              label: previewItem.label,
              roleAccessKey: `preview.${previewItem.scope}`,
            };
          }),
        };
        acc.push(previewSection);

        return acc;
      },
      [],
    );

    setPreviewSections(tempPreviewSections);
  }, [dataPointsToShow?.length]);

  return (
    <>
      {previewSections.map((section) => {
        const { key, menuItems } = section;

        return (
          <ContextMenuSection key={key} section={section}>
            {menuItems.map((item, index) => (
              <ContextMenuItemView key={item.key} index={index} item={item} />
            ))}
          </ContextMenuSection>
        );
      })}
    </>
  );
}

//#region Private members
interface PreviewItemClickHandler extends ContextMenuClickHandler<PreviewItem> {
  previewPanelActions: PreviewPanelActions;
}

function getClickHandler({ handleClose, item, previewPanelActions }: PreviewItemClickHandler) {
  const { widgets, previewTitle } = item;

  return () => () => {
    handleClose();
    previewPanelActions.setPreviewWidgets(widgets);
    previewPanelActions.openPreviewPanel(previewTitle);
  };
}

interface GetPreviewItemsProps {
  dataPointToShow: DataPointWithFormattedValue;
  dataPoints: DataPointWithFormattedValue[];
  widgetContextParams: VizParams;
}

interface PreviewItem {
  label: ReactElement;
  previewTitle: ReactElement;
  scope: WidgetScope;
  widgets: Widget[];
}

function getPreviewItems({
  dataPointToShow,
  dataPoints,
  widgetContextParams,
}: GetPreviewItemsProps): PreviewItem[] {
  const { attribute, formattedValue, value } = dataPointToShow;
  const isSingleCardinality = isSingleCardinalityDataPoint(dataPointToShow);
  const scope = isSingleCardinality ? WidgetScope.Single : WidgetScope.Collection;
  const entityId = attribute.id;

  if (scope === WidgetScope.Single && isNilOrEmpty(value?.id)) {
    return [];
  }

  const showPreview = entityHasWidgets({
    entityId,
    scope,
  });

  if (!showPreview) {
    return;
  }

  const widgets = getWidgetsByEntity({
    entityId,
    scope,
  });

  const contextDataPoints = getContextDataPoints({
    dataPointToShow,
    dataPoints,
  });

  const { widgetsWithContextDataPointFilters, widgetsWithDefaultFilters } = getWidgetsDecoratedWithFilters({
    contextDataPoints,
    dataPoint: dataPointToShow,
    scope,
    widgets,
    widgetContextParams,
  });

  // TODO: @cafe Handle more than 1 context data point in the future (i.e.: 3 data points)
  const [firstContextDataPoint] = contextDataPoints;
  const filteredBy = firstContextDataPoint?.value.displayValue;
  const filteredByEntity = firstContextDataPoint?.attribute.name;

  const values = {
    entity: attribute.name,
    filteredBy: filteredBy || filteredByEntity,
    filteredByEntity,
    value: formattedValue,
  };

  if (scope === WidgetScope.Single) {
    const singlePreviewItems: PreviewItem[] = [
      {
        label: <Translate id="app.contextMenu.preview.single" type="html" values={values} />,
        previewTitle: <Translate id="app.previewLayout.singleTitle" type="html" values={values} />,
        scope,
        widgets: widgetsWithDefaultFilters,
      },
    ];
    if (!isNilOrEmpty(contextDataPoints)) {
      singlePreviewItems.push({
        label: <Translate id="app.contextMenu.preview.singleFiltered" type="html" values={values} />,
        previewTitle: <Translate id="app.previewLayout.singleTitleFiltered" type="html" values={values} />,
        scope,
        widgets: widgetsWithContextDataPointFilters,
      });
    }
    return singlePreviewItems;
  } else {
    const collectionPreviewItems: PreviewItem[] = [
      {
        label: <Translate id="app.contextMenu.preview.collection" type="html" values={values} />,
        previewTitle: <Translate id="app.previewLayout.collectionTitle" type="html" values={values} />,
        scope: WidgetScope.Collection,
        widgets: widgetsWithDefaultFilters,
      },
    ];
    if (!isNilOrEmpty(contextDataPoints)) {
      collectionPreviewItems.push({
        label: <Translate id="app.contextMenu.preview.collectionFiltered" type="html" values={values} />,
        previewTitle: (
          <Translate id="app.previewLayout.collectionTitleFiltered" type="html" values={values} />
        ),
        scope: WidgetScope.Collection,
        widgets: widgetsWithContextDataPointFilters,
      });
    }
    return collectionPreviewItems;
  }
}
//#endregion
