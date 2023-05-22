import {
  Maybe,
  Widget,
  WidgetCategory,
  WidgetsByCategory,
  WidgetsByEntityByScopeByCategory,
  WidgetsByScope,
} from '@kleeen/types';
import { isNilOrEmpty, nonEmptyFilter } from '@kleeen/common/utils';
import { widgets, widgetsByEntity } from './data';

import { WidgetByEntityBaseParam } from './types';
import { getWidgetCategoryByWidgetType } from './utils';

const decoratedWidgetsByEntity = getDecoratedWidgetsByEntity();
const decoratedWidgetsByEntityByCategory = getDecoratedWidgetsByEntityByCategory();

export function entityHasWidgets({ entityId, scope }: WidgetByEntityBaseParam): boolean {
  return (
    !isNilOrEmpty(decoratedWidgetsByEntity[entityId]) &&
    !isNilOrEmpty(decoratedWidgetsByEntity[entityId][scope])
  );
}

export function getWidget(widgetId: string): Maybe<Widget> {
  return widgets[widgetId];
}

export function getWidgetsByEntity({ entityId, scope }: WidgetByEntityBaseParam): Widget[] {
  if (!entityHasWidgets({ entityId, scope })) return [];

  return decoratedWidgetsByEntity[entityId][scope] as Widget[];
}

export function getWidgetsByEntityByCategory({
  entityId,
  scope,
}: WidgetByEntityBaseParam): Maybe<WidgetsByCategory> {
  if (!entityHasWidgets({ entityId, scope })) return;

  return decoratedWidgetsByEntityByCategory[entityId][scope];
}

//#region Private members
function decorateAndSortWidgetsByCategory(widgetIds: string[]): Widget[] {
  const WidgetCategorySortingOrder: { [key in WidgetCategory]: number } = {
    [WidgetCategory.Summary]: 1,
    [WidgetCategory.Visualization]: 2,
    [WidgetCategory.Table]: 3,
  };

  return widgetIds
    .map((id) => {
      return getWidget(id);
    })
    .filter(nonEmptyFilter)
    .sort((a, b) => {
      const aCategory = getWidgetCategoryByWidgetType(a.chartType);
      const bCategory = getWidgetCategoryByWidgetType(b.chartType);
      const aValue = WidgetCategorySortingOrder[aCategory];
      const bValue = WidgetCategorySortingOrder[bCategory];
      return aValue - bValue;
    });
}

function getDecoratedWidgetsByEntity(): WidgetsByScope {
  const newWidgetsByEntity = Object.keys(widgetsByEntity).reduce(
    (acc: WidgetsByScope, strKey): WidgetsByScope => {
      const key = parseInt(strKey);
      const widgetByEntity = widgetsByEntity[key];
      const single = decorateAndSortWidgetsByCategory(widgetByEntity?.single || []);
      const collection = decorateAndSortWidgetsByCategory(widgetByEntity?.collection || []);

      acc[key] = {
        single,
        collection,
      };

      return acc;
    },
    {},
  );

  return newWidgetsByEntity;
}

function reduceToCategories(acc: WidgetsByCategory, widgetId: string): WidgetsByCategory {
  const widget = getWidget(widgetId);

  if (isNilOrEmpty(widget)) return acc;

  const widgetCategory = getWidgetCategoryByWidgetType(widget.chartType);
  const category = acc[widgetCategory];

  if (isNilOrEmpty(category)) {
    acc[widgetCategory] = [widget];
  }

  category?.push(widget);
  return acc;
}

function getDecoratedWidgetsByEntityByCategory(): WidgetsByEntityByScopeByCategory {
  const newWidgetsByEntity = Object.keys(widgetsByEntity).reduce(
    (acc: WidgetsByEntityByScopeByCategory, strKey): WidgetsByEntityByScopeByCategory => {
      const key = parseInt(strKey);
      const widgetByEntity = widgetsByEntity[key];

      acc[key] = {
        single: widgetByEntity?.single?.reduce(reduceToCategories, {}),
        collection: widgetByEntity?.collection?.reduce(reduceToCategories, {}),
      };

      return acc;
    },
    {},
  );

  return newWidgetsByEntity;
}
//#endregion
