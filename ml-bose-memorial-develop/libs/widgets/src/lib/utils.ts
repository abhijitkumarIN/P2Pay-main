import { WidgetCategory, WidgetIcons, WidgetTypes } from '@kleeen/types';

type StringOrWidgetType = string | WidgetTypes;

export function getIconByWidgetCategory(widgetCategory: WidgetCategory): WidgetIcons {
  switch (widgetCategory) {
    case WidgetCategory.Summary:
      return WidgetIcons.Summary;
    case WidgetCategory.Table:
      return WidgetIcons.Table;
    default:
      return WidgetIcons.Visualization;
  }
}

export function getIconByWidgetType(widgetType: StringOrWidgetType): WidgetIcons {
  switch (widgetType) {
    case WidgetTypes.CONFIG_INPUT_FIELD_USER_DEFINED:
      return WidgetIcons.Config;
    case WidgetTypes.CUSTOM_ACTION:
      return WidgetIcons.Action;
    case WidgetTypes.CUSTOM:
      return WidgetIcons.Custom;
    case WidgetTypes.SUMMARY:
    case WidgetTypes.SUMMARY_SLOT:
    case WidgetTypes.SUMMARY_STATISTICS:
      return WidgetIcons.Summary;
    case WidgetTypes.CONFIG_TABLE:
    case WidgetTypes.FULL_TABLE:
    case WidgetTypes.TABLE:
      return WidgetIcons.Table;
    default:
      return WidgetIcons.Visualization;
  }
}

export function getWidgetCategoryByWidgetType(widgetType: StringOrWidgetType): WidgetCategory {
  if (isSummaryWidget(widgetType)) {
    return WidgetCategory.Summary;
  } else if (isTableWidget(widgetType)) {
    return WidgetCategory.Table;
  }

  return WidgetCategory.Visualization;
}

const summaryWidgetTypes = [WidgetTypes.SUMMARY, WidgetTypes.SUMMARY_STATISTICS, WidgetTypes.SUMMARY_SLOT];

export function isSummaryWidget(widgetType: StringOrWidgetType): boolean {
  return summaryWidgetTypes.includes(widgetType as WidgetTypes);
}

const tableWidgetTypes = [WidgetTypes.FULL_TABLE, WidgetTypes.TABLE];

export function isTableWidget(widgetType: StringOrWidgetType): boolean {
  return tableWidgetTypes.includes(widgetType as WidgetTypes);
}

export function isVisualizationWidget(widgetType: StringOrWidgetType): boolean {
  return !(isSummaryWidget(widgetType) || isTableWidget(widgetType));
}
