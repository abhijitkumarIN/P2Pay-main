import './grid-area-section.scss';

import { KsBadgeClickable, KsVirtualTable } from '@kleeen/react/components';
import { Pagination, ScrollOrientationStrategy, UpdateDataStrategy } from '@kleeen/types';
import {
  getWidgetContextName,
  useKleeenActions,
  useLocalStorage,
  useUrlQueryParams,
  useWidgetContext,
} from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { GridAreaSectionProps } from './grid-area-section.model';
import { Order } from '@kleeen/common/utils';
import { Translate } from '@kleeen/core-react';
import { useSort } from './hooks';

export function GridAreaSection(props: GridAreaSectionProps) {
  const { taskName, widget } = props;
  const { actions, id: widgetId, attributes, entityId, params } = widget;
  const entityActions = useKleeenActions(taskName);
  const contextName = getWidgetContextName({ taskName, widgetId: widgetId as string });
  const widgetActions = useKleeenActions(contextName);
  const keySortingLocalStorage = `sorting-widget-${widgetId}`;
  const { localStorageValue: sorting, setLocalStorageValue: setSorting } = useLocalStorage(
    keySortingLocalStorage,
    [],
  );
  const [, onSort] = useSort({ setSorting });
  const [isBadgeShown, setIsBadgeShown] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [scrollOrientation, setScrollOrientation] = useState<ScrollOrientationStrategy | null>();
  const { paramsBasedOnRoute } = useUrlQueryParams({ useNestedObjects: true });
  const widgetData = useWidgetContext({
    params: { ...params, attributes, sorting },
    taskName,
    widgetId,
  });

  const data = widgetData?.data?.data;
  const format = widgetData?.data?.format;
  const isLoading = widgetData?.isLoading;
  const isLoadingAdditionalRows = widgetData?.isLoadingAdditionalRows;
  const order = sorting.length ? sorting[0].sort : Order.none;
  const orderBy = sorting.length ? sorting[0].columnName : '';
  const pagination = widgetData?.data?.pagination;
  const strategy = widgetData?.strategy;

  const entityData = { data, format, isLoading, isLoadingAdditionalRows, pagination };

  function getMoreRows(nextPage: Pagination): void {
    widgetActions.getMoreData({
      params: { ...params, attributes, pagination: nextPage, sorting, filters: paramsBasedOnRoute },
      taskName,
      widgetId,
    });
  }

  function handleBadgeClick() {
    if (strategy === UpdateDataStrategy.PrependData) {
      widgetActions.prependData();
    }

    handleScroll();
    handleChange();
  }

  function handleChange() {
    setIsBadgeShown((prevIsBadgeShown) => !prevIsBadgeShown);
  }

  function handleScroll() {
    setIsScroll(true);
  }

  //TODO @cafe make this a badges factory
  const BadgeClickableComponent = (
    <KsBadgeClickable onClick={handleBadgeClick} isShowed={isBadgeShown}>
      {strategy === UpdateDataStrategy.PrependData && <Translate id={'app.updateData.badge.newData'} />}
    </KsBadgeClickable>
  );

  useEffect(() => {
    const showBadge = strategy === UpdateDataStrategy.PrependData;

    if (showBadge) {
      setIsBadgeShown(true);
      setScrollOrientation(ScrollOrientationStrategy.ScrollTop); // ScrollTop when the strategy is prepend
    }
  }, [strategy, widgetData]);

  useEffect(() => {
    if (isScroll) {
      setIsScroll(false);
    }
  }, [isScroll]);

  return (
    <KsVirtualTable
      actions={actions}
      attributes={attributes}
      BadgeClickable={BadgeClickableComponent}
      entity={entityData}
      entityActions={entityActions}
      entityId={entityId}
      getMoreRows={getMoreRows}
      isScroll={isScroll}
      onSort={onSort}
      order={order}
      orderBy={orderBy}
      scrollOrientation={scrollOrientation}
      sortableColumns={props.sortableColumns}
      sorting={sorting}
      widgetId={widgetId}
      {...props}
    />
  );
}
