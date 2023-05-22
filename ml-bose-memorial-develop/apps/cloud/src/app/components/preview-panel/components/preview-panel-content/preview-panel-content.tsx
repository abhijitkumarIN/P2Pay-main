import { CardSectionLayout, Widget, WidgetCategory, WidgetSection } from '@kleeen/types';
import { isSummaryWidget, isTableWidget, isVisualizationWidget } from '@kleeen/widgets';
import { useEffect, useState } from 'react';

import { CardSection } from '@kleeen/react/atomic-elements';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { usePreviewPanel } from '@kleeen/react/hooks';
import { useStyles } from './preview-panel-content.styles';

const widgetCategoryFilters = {
  [WidgetCategory.Summary]: isSummaryWidget,
  [WidgetCategory.Table]: isTableWidget,
  [WidgetCategory.Visualization]: isVisualizationWidget,
};

export function PreviewPanelContent() {
  const { previewWidgets, previewWidgetCategory } = usePreviewPanel();
  const [widgetsFilteredByCategory, setWidgetsFilteredByCategory] = useState<Widget[]>([]);
  const styles = useStyles();

  useEffect(() => {
    if (isNilOrEmpty(previewWidgetCategory)) return;

    const newWidgetsFilteredByCategory = previewWidgets
      .filter((previewWidget) => {
        const widgetCategoryFilter = widgetCategoryFilters[previewWidgetCategory];

        if (typeof widgetCategoryFilter != 'function') {
          console.error(`There is no widgetCategoryFilter for "${previewWidgetCategory}"`);
          return false;
        }

        const shouldFilterInWidget = widgetCategoryFilter(previewWidget.chartType);

        return shouldFilterInWidget;
      })
      .map((widget) => {
        return { ...widget, section: WidgetSection.Preview };
      });

    setWidgetsFilteredByCategory(newWidgetsFilteredByCategory);
  }, [previewWidgets, previewWidgetCategory]);

  if (isNilOrEmpty(previewWidgetCategory)) return null;

  return (
    <div className={styles.previewContent}>
      <CardSection
        cardSectionLayout={
          previewWidgetCategory === WidgetCategory.Visualization
            ? CardSectionLayout.Masonry
            : CardSectionLayout.SingleWideColumn
        }
        justifyContent="center"
        key={`preview-card-section-${previewWidgetCategory}`}
        taskName="previewPanel"
        widgets={widgetsFilteredByCategory}
      />
    </div>
  );
}
