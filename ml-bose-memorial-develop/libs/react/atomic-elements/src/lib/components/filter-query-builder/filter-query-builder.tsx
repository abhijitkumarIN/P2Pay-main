import { ClassNameBem, FilterRule, SingleFilterRuleValue } from '@kleeen/types';
import { FilterQueryBuilderActionsProps, FilterQueryBuilderProps } from './filter-query-builder.model';
import { useFilterQuery, useFilterQueryActions } from '../filter-section/hooks';

import { FilterRow } from './components';
import { KsButtonText } from '@kleeen/react/components';
import classnames from 'classnames';
import { isFilterIdOnly } from './utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './filter-query-builder.styles';

const bem = ClassNameBem.FilterQueryBuilder;

export function FilterQueryBuilder({ onFilter }: FilterQueryBuilderProps) {
  const classes = useStyles();

  return (
    <div className={classnames(bem, classes.filterSelectionContainer)}>
      <FilterRows />
      <FilterActions onFilter={onFilter} />
    </div>
  );
}

//#region Private members
function FilterActions({ onFilter }: FilterQueryBuilderActionsProps) {
  const { filterQuery } = useFilterQuery();
  const { addRule, translate } = useFilterQueryActions();
  const classes = useStyles();

  function handleFilter() {
    onFilter(filterQuery);
  }

  return (
    <div className={classnames(`${bem}__actions`, classes.actions)}>
      <KsButtonText className={classnames(`${bem}__actionButton`, classes.actionButton)} onClick={addRule}>
        {translate('app.filterSelection.filter.add')}
      </KsButtonText>
      <KsButtonText
        className={classnames(`${bem}__actionButton`, classes.actionButton)}
        onClick={handleFilter}
      >
        {translate('app.filterSelection.filter.apply')}
      </KsButtonText>
    </div>
  );
}

function FilterRows() {
  const { filterQuery } = useFilterQuery();
  const { translate } = useFilterQueryActions();
  const classes = useStyles();

  if (isNilOrEmpty(filterQuery.rules)) {
    return (
      <div className={classnames(`${bem}__no-filters`, classes.noFilters)}>
        {translate('app.filterSelection.filter.noApplied')}
      </div>
    );
  }

  function getFilterRowKey(filterRule: FilterRule, index: number): string {
    const filterRowKeyPrefix = `${filterRule.field}-${filterRule.operation}`;
    const filterRowKeySuffix = index;

    if (isFilterIdOnly(filterRule)) {
      const value = filterRule.value as SingleFilterRuleValue;

      return `${filterRowKeyPrefix}-${value?.id}-${filterRowKeySuffix}`;
    }

    // TODO: @cafe need to find a way to distinguish two rows that have the same field and operation, but with different values.
    // Probably the ideal solution is to not allow users to add multiple filters for the same field and operation, representing that in a Chip component or similar.
    return `${filterRowKeyPrefix}-${filterRowKeySuffix}`;
  }

  return (
    <>
      {filterQuery.rules.map((filterRule, index) => {
        return <FilterRow filterRule={filterRule} index={index} key={getFilterRowKey(filterRule, index)} />;
      })}
    </>
  );
}
//#endregion
