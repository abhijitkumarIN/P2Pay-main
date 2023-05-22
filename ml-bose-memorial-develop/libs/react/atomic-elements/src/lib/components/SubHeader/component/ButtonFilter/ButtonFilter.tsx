import './ButtonFilter.scss';

import { Filter, FilterOption, FilterSectionEnum, Params } from '../../../FilterSection/FilterSection.model';
import { FilterOperators, ReactElement } from '@kleeen/types';
import { cleanUnavailableFilters, isSomeFilterUnavailable } from '@kleeen/frontend/utils';
import { useEffect, useState } from 'react';
import { useFilterContext, useFilters } from '@kleeen/react/hooks';

import { ButtonFilterProps } from './ButtonFilter.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { ContainerHeader } from '../ContainerHeader/ContainerHeader';
import FilterCreatorWithChips from '../../../FilterSection/components/FilterCreatorWithChips';
import { Tooltip } from '../../../FilterSection/FilterSection.styles';
import { clone } from 'lodash';
import { filterTooltipFunc } from '../../../FilterSection/components/FilterTooltip';
import { isNil } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';

const parseToFilterOptions = (options: string[]): FilterOption[] =>
  options.map((option) => ({
    name: option,
    section: FilterSectionEnum.Values,
    operator: FilterOperators.in,
  }));

export const ButtonFilter = ({
  outContainer,
  filters: filtersProps,
  taskName,
  translate,
}: ButtonFilterProps): ReactElement => {
  const [isShow, setIsShow] = useState(false);

  const {
    handleFilterWithoutTimestamp,
    removeValue,
    addFilter,
    removeCategory,
    queryParams,
    isApplyWithoutTimeDisabled,
    filtersAdded,
    clearFilters,
    setIsApplyWithoutTime,
  } = useFilters();
  const { paramsBasedOnRoute, version } = queryParams;
  const [filtersAddedClone, setFiltersAddedClone] = useState(clone(filtersAdded));
  const [paramsBasedOnRouteClone, setParamsBasedOnRouteClone] = useState(clone(paramsBasedOnRoute));
  const handleFilterWithoutTimestampClone = (): void => {
    handleFilterWithoutTimestamp();
    setParamsBasedOnRouteClone(filtersAddedClone);
  };

  useEffect(() => {
    setFiltersAddedClone(clone(filtersAdded));
    if (!isNil(filtersAddedClone?.Timestamp)) {
      delete filtersAddedClone.Timestamp;
    }
  }, [filtersAdded]);

  useEffect(() => {
    if (!isNil(paramsBasedOnRouteClone?.Timestamp)) {
      delete paramsBasedOnRouteClone.Timestamp;
    }
  }, [paramsBasedOnRouteClone]);

  useEffect(() => {
    setParamsBasedOnRouteClone(clone(paramsBasedOnRoute));
  }, [version]);

  const availableAttributesToFilter = filtersProps || [];

  const categoryFilterOptions = availableAttributesToFilter.map(({ name, statisticalType }) => ({
    name,
    section: translate('app.subHeader.filterSection.filterBy'),
    statisticalType,
  }));

  const params: Params = {
    baseModel: 'filters',
    attributes: availableAttributesToFilter.map(({ name }) => name).join(),
    operationName: 'filters',
  };
  const widgetData = useFilterContext({ taskName, widgetId: 'filters', params });
  const { results: filters }: Filter = (widgetData && widgetData.data) || {};
  const filterOptionsByCategory = filters
    ? filters.reduce(
        (acc, [filterName, options]) => ((acc[filterName] = parseToFilterOptions(options)), acc),
        {},
      )
    : {};

  const onClearFilters = (e): void => {
    clearFilters();
    Object.keys(filtersAdded).map((key) => {
      removeCategory(key);
    });
    handleFilterWithoutTimestampClone();
  };

  const shouldClearUnavailableFilters =
    !isNilOrEmpty(filtersAddedClone) &&
    !isNilOrEmpty(filterOptionsByCategory) &&
    isSomeFilterUnavailable(filtersAddedClone, filterOptionsByCategory);
  const filtersAvailable = shouldClearUnavailableFilters
    ? cleanUnavailableFilters(filtersAddedClone, filterOptionsByCategory)
    : filtersAddedClone;

  const filterSummary = filterTooltipFunc(filtersAvailable, translate);

  return (
    <>
      <Tooltip
        title={filterSummary.title}
        PopperProps={filterSummary.PopperProps}
        placement="right"
        interactive
      >
        <div className="button-tooltip">
          <ButtonSubHeader
            icon="ks-filter"
            className="element-button-filter"
            name={translate('app.subHeader.buttonFilter.appliedFilters')}
            countElement={filterSummary.badgeContent}
            setIsShow={setIsShow}
            translate={translate}
            isShow={isShow}
          />
        </div>
      </Tooltip>
      <ContainerHeader
        className="button-container-filter-actions"
        filtersAdded={filtersAvailable}
        isApplyDisabled={isApplyWithoutTimeDisabled}
        isShow={isShow}
        onClearFilters={onClearFilters}
        onFilter={handleFilterWithoutTimestampClone}
        outContainer={outContainer}
        setIsShow={setIsShow}
        translate={translate}
        container={
          <FilterCreatorWithChips
            categoryFilterOptions={categoryFilterOptions}
            filterOptionsByCategory={filterOptionsByCategory}
            addFilter={addFilter}
            filtersAdded={filtersAvailable}
            setIsApplyDisabled={setIsApplyWithoutTime}
            removeValue={removeValue}
            removeCategory={removeCategory}
            translate={translate}
          />
        }
      />
    </>
  );
};
