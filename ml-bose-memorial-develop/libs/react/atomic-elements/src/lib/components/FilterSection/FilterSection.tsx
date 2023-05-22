import './FilterSection.scss';

import { KsButton as Button, KsIcon, KsIconButton } from '@kleeen/react/components';
import { Filter, FilterOption, FilterSectionEnum, FilterSectionProps, Params } from './FilterSection.model';
import { FilterOperators, Translate } from '@kleeen/types';
import { Paper, useStyles } from './FilterSection.styles';
import { cleanUnavailableFilters, isSomeFilterUnavailable } from '@kleeen/frontend/utils';
import { getAvailableFilters, isNilOrEmpty } from '@kleeen/common/utils';
import { useFilterContext, useFilters } from '@kleeen/react/hooks';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { DatePickerInterval } from '../DatePickerInterval/index';
import FilterCreator from './components/FilterCreator';
import FilterTooltip from './components/FilterTooltip';
import FiltersComp from './components/FilterChipsAndCategories';
import Grid from '@material-ui/core/Grid';
import { KUIConnect } from '@kleeen/core-react';
import { Loader } from '@kleeen/react/components';
import MuiTypography from '@material-ui/core/Typography';
import React from 'react';

function FilterSectionComponent({ translate, ...props }: FilterSectionProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const availableAttributesToFilter = props.filters ? getAvailableFilters(props.filters) : [];
  const categoryFilterOptions: FilterOption[] = availableAttributesToFilter.map(
    ({ name, statisticalType, accessLevel }) => ({
      accessLevel,
      name,
      section: translate ? translate('app.subHeader.filterSection.filterBy') : FilterSectionEnum.FilterBy,
      statisticalType,
    }),
  );

  const params: Params = {
    baseModel: 'filters',
    attributes: availableAttributesToFilter.map(({ name }) => name).join(),
    operationName: 'filters',
  };
  const widgetData = useFilterContext({ taskName: props.taskName, widgetId: 'filters', params });
  const { results: filters }: Filter = (widgetData && widgetData.data) || {};
  const filterOptionsByCategory = filters
    ? filters.reduce(
        (acc, [filterName, options]) => ((acc[filterName] = parseToFilterOptions(options, translate)), acc),
        {},
      )
    : {};

  function handleDrawerOpen() {
    setOpen(true);

    if (typeof props.onChangeFilterVisible == 'function') {
      props.onChangeFilterVisible(true);
    }
  }

  function handleDrawerClose() {
    setOpen(false);

    if (typeof props.onChangeFilterVisible == 'function') {
      props.onChangeFilterVisible(false);
    }
  }

  const {
    addFilter,
    datePickerState,
    filtersAdded,
    handleFilter,
    isApplyDisabled,
    removeCategory,
    removeValue,
    setIsApplyDisabled,
  } = useFilters(props.hasDateFilter);

  const shouldClearUnavailableFilters =
    !isNilOrEmpty(filtersAdded) &&
    !isNilOrEmpty(filterOptionsByCategory) &&
    isSomeFilterUnavailable(filtersAdded, filterOptionsByCategory);
  const filtersAvailable = shouldClearUnavailableFilters
    ? cleanUnavailableFilters(filtersAdded, filterOptionsByCategory)
    : filtersAdded;

  return (
    <>
      {open ? (
        <Paper elevation={3} className="filter-section">
          <div className="filter-container">
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <MuiTypography className="L2TitleSection">
                  {translate('app.filterSection.title')}
                </MuiTypography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className="button-widget"
                  color="primary"
                  disabled={isApplyDisabled}
                  onClick={handleFilter}
                  variant="contained"
                >
                  {translate('app.filterSection.apply')}
                </Button>
              </Grid>
            </Grid>
            {props.hasDateFilter && (
              <Grid container spacing={0} className="grid-date-filter-container">
                <Grid item xs={12}>
                  <DatePickerInterval datePickerState={datePickerState} />
                </Grid>
              </Grid>
            )}
            {!widgetData || widgetData.isLoading ? (
              <Loader />
            ) : (
              <>
                <FilterCreator
                  addFilter={addFilter}
                  categoryFilterOptions={categoryFilterOptions}
                  filterOptionsByCategory={filterOptionsByCategory}
                  filtersAdded={filtersAvailable}
                  setIsApplyDisabled={setIsApplyDisabled}
                />
                <FiltersComp
                  filters={filtersAvailable}
                  removeCategory={removeCategory}
                  removeValue={removeValue}
                />
              </>
            )}
          </div>
          <div className={classes.closeContainer} onClick={handleDrawerClose}>
            <ArrowLeftIcon className={classes.iconClose} />
          </div>
        </Paper>
      ) : (
        <Paper elevation={3} className={classes.drawerClose}>
          <FilterTooltip paramsBasedOnRoute={filtersAvailable}>
            <KsIconButton onClick={handleDrawerOpen}>
              <KsIcon icon="ks-filter" />
            </KsIconButton>
          </FilterTooltip>
        </Paper>
      )}
    </>
  );
}

export const FilterSection = KUIConnect(({ translate }) => ({ translate }))(FilterSectionComponent);

export default KUIConnect(({ translate }) => ({ translate }))(FilterSectionComponent);

//#region Private members
function parseToFilterOptions(options: string[], translate: Translate): FilterOption[] {
  return options.map((option) => ({
    name: option,
    section: translate ? translate('app.subHeader.filterSection.values') : FilterSectionEnum.Values,
    operator: FilterOperators.in,
  }));
}
//#endregion
