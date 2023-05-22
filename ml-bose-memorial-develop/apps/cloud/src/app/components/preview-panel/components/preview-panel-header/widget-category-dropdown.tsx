import { ItemType, KsDropDown, KsSvgIconSize } from '@kleeen/react/components';
import { Maybe, WidgetCategory } from '@kleeen/types';
import React, { useEffect, useState } from 'react';
import { getIconByWidgetCategory, getWidgetCategoryByWidgetType } from '@kleeen/widgets';
import { usePreviewPanel, usePreviewPanelActions } from '@kleeen/react/hooks';

import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './preview-panel-header.styles';

export function WidgetCategoryDropdown() {
  const { previewWidgets } = usePreviewPanel();
  const { setPreviewWidgetCategory } = usePreviewPanelActions();
  const [selectedWidgetCategoryOption, setSelectedWidgetCategoryOption] = useState<ItemType | null>(null);
  const [widgetCategoryOptions, setWidgetCategoryOptions] = useState<ItemType[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (isNilOrEmpty(previewWidgets)) return;

    const newWidgetCategoryOptionsMap = previewWidgets.reduce(
      (acc: { [key: string]: ItemType<WidgetCategory> }, previewWidget) => {
        const widgetCategory = getWidgetCategoryByWidgetType(previewWidget.chartType);
        const newWidgetCategoryOption = resolveWidgetCategoryOption({ widgetCategory });

        if (isNilOrEmpty(newWidgetCategoryOption)) return acc;

        const isAlreadyPartOfTheOptions = acc[newWidgetCategoryOption.key];

        if (isAlreadyPartOfTheOptions) return acc;

        acc[newWidgetCategoryOption.key] = {
          ...newWidgetCategoryOption,
          handleOnClick(_: React.MouseEvent<HTMLElement, MouseEvent>, item: ItemType<WidgetCategory>) {
            setPreviewWidgetCategory(item.option);
          },
          option: widgetCategory,
        };

        return acc;
      },
      {},
    );
    const newWidgetCategoryOptions = Object.values(newWidgetCategoryOptionsMap).sort(
      (a, b) => (a?.order || 0) - (b?.order || 0),
    );

    setWidgetCategoryOptions(newWidgetCategoryOptions);
  }, [setPreviewWidgetCategory, previewWidgets, previewWidgets?.length]);

  useEffect(() => {
    if (isNilOrEmpty(widgetCategoryOptions)) return;

    const [firstOption] = widgetCategoryOptions;

    setPreviewWidgetCategory(firstOption.option);
    setSelectedWidgetCategoryOption(firstOption);
  }, [setPreviewWidgetCategory, widgetCategoryOptions, widgetCategoryOptions?.length]);

  return (
    <KsDropDown
      headerTranslationId="app.previewLayout.widgetCategory.headerSection"
      options={widgetCategoryOptions}
      placement="bottom-start"
      selectedItem={selectedWidgetCategoryOption}
      shouldHighlightSelected
      styles={{
        dropDownButton: classes.previewHeaderWidgetCategoryDropdownButton,
      }}
    />
  );
}

//#region Private members
const widgetCategoryResolvers: { [key in WidgetCategory]: ItemType } = {
  [WidgetCategory.Summary]: {
    icon: getIconByWidgetCategory(WidgetCategory.Summary),
    iconSize: KsSvgIconSize.Large,
    key: `widget-category-dropdown-${WidgetCategory.Summary}`,
    label: <Translate id={`app.previewLayout.widgetCategory.${WidgetCategory.Summary}`} />,
    order: 1,
  },
  [WidgetCategory.Table]: {
    icon: getIconByWidgetCategory(WidgetCategory.Table),
    iconSize: KsSvgIconSize.Large,
    key: `widget-category-dropdown-${WidgetCategory.Table}`,
    label: <Translate id={`app.previewLayout.widgetCategory.${WidgetCategory.Table}`} />,
    order: 3,
  },
  [WidgetCategory.Visualization]: {
    icon: getIconByWidgetCategory(WidgetCategory.Visualization),
    iconSize: KsSvgIconSize.Large,
    key: `widget-category-dropdown-${WidgetCategory.Visualization}`,
    label: <Translate id={`app.previewLayout.widgetCategory.${WidgetCategory.Visualization}`} />,
    order: 2,
  },
};

function resolveWidgetCategoryOption({
  widgetCategory,
}: {
  widgetCategory: WidgetCategory;
}): Maybe<ItemType> {
  return widgetCategoryResolvers[widgetCategory];
}
//#endregion
