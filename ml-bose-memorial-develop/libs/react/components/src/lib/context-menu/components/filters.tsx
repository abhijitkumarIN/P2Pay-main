import { ContextMenuItem, DataPointWithFormattedValue, FilterTypes } from '@kleeen/types';
import { ContextMenuSectionItem, ContextMenuSectionProps } from '../context-menu.model';
import {
  areFiltersInUse,
  getFilterItems,
  useAvailableFiltersByWorkflow,
  useLocalStorage,
  useUrlQueryParams,
  useUserInfo,
} from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { ContextMenuItemView } from './context-menu-item';
import { ContextMenuSection } from './context-menu-section';
import { Translate } from '@kleeen/core-react';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useHistory } from 'react-router-dom';

export function KsContextMenuFilterSection({ dataPointsToShow, handleClose }: ContextMenuSectionProps) {
  const history = useHistory();
  const { paramsBasedOnRoute } = useUrlQueryParams({ useNestedObjects: true });
  const _user = useUserInfo();
  const filtersInUse = areFiltersInUse();
  const [filterSections, setFilterSections] = useState<ContextMenuSectionItem[]>([]);

  const userName = _user?.userInfo?.username;
  const localStorageKey = userName ? `filters-${history.location.pathname}-${userName}` : null;
  const { setLocalStorageValue } = useLocalStorage(localStorageKey, '');
  const { availableFilters: availableDataPoints, hasFilters } =
    useAvailableFiltersByWorkflow<DataPointWithFormattedValue>(dataPointsToShow, ['attribute', 'name']);

  useEffect(() => {
    if (isNilOrEmpty(localStorageKey) || isNilOrEmpty(availableDataPoints)) {
      return;
    }

    const tempFilterSections = availableDataPoints.reduce(
      (acc: ContextMenuSectionItem[], dataPoint, dataPointIndex) => {
        const { attribute } = dataPoint;
        const filterItems = getFilterItems({
          dataPoint,
          filtersInUse,
          handleClose,
          history,
          paramsBasedOnRoute,
          setLocalStorageValue,
        });

        const filterInItems = filterItems.filter((item) => item.filterType === FilterTypes.in);
        const filterOutItems = filterItems.filter((item) => item.filterType === FilterTypes.out);

        if (!isNilOrEmpty(filterInItems)) {
          const filterInSection = {
            key: `filter-in-${dataPointIndex}`,
            label: (
              <Translate
                id="app.contextMenu.filter.addAndApply"
                type="html"
                values={{ value: attribute?.label }}
              />
            ),
            menuItems: filterInItems as ContextMenuItem[],
          };

          acc.push(filterInSection);
        }
        if (!isNilOrEmpty(filterOutItems)) {
          const filterOutSection = {
            key: `filter-out-${dataPointIndex}`,
            label: (
              <Translate
                id="app.contextMenu.filter.removeAndApply"
                type="html"
                values={{ value: attribute?.label }}
              />
            ),
            menuItems: filterOutItems as ContextMenuItem[],
          };

          acc.push(filterOutSection);
        }
        return acc;
      },
      [],
    );

    setFilterSections(tempFilterSections);
  }, [filtersInUse, dataPointsToShow?.length, localStorageKey, hasFilters]);

  return (
    <>
      {filterSections.map((section) => {
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
