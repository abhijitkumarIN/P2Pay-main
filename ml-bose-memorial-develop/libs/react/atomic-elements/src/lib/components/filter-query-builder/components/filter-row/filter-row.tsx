import {
  ClassNameBem,
  ElementInputType,
  FilterCombinator,
  FilterOperation,
  ListItem,
  SingleFilterRuleValue,
} from '@kleeen/types';
import { DisplayIdFilterProps, FilterRowPartialProps, FilterRowProps } from './filter-row.model';
import { IconButton, Tooltip } from '@material-ui/core';
import { KsAutocomplete, KsTextField } from '@kleeen/react/components';
import { getFilterElement, getFilterOperators } from '@kleeen/elements';
import { memo, useEffect, useState } from 'react';

import { Clear } from '@material-ui/icons';
import classnames from 'classnames';
import { getInputElement } from '../../../input-element/input-element-catalog';
import { isFilterIdOnly } from '../../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useFilterQueryActions } from '../../../filter-section/hooks';
import { useIsFilterDisabled } from '../../hooks';
import { useStyles } from '../../filter-query-builder.styles';

const bem = ClassNameBem.FilterRow;

export const FilterRow = memo(({ filterRule, index }: FilterRowProps) => {
  const classes = useStyles();

  const partialProps = {
    classes,
    filterRule,
    index,
  };

  return (
    <div className={classnames(bem, classes.row)}>
      <FilterRowWhere {...partialProps} />
      <FilterRowAttributes {...partialProps} />
      <FilterRowOperations {...partialProps} />
      <FilterRowInput {...partialProps} />
      <FilterRowRemove {...partialProps} />
    </div>
  );
});

//#region Private members
function FilterRowAttributes({ classes, filterRule, index }: FilterRowPartialProps) {
  const { attributes, setField, translate } = useFilterQueryActions();
  const isDisabled = useIsFilterDisabled(filterRule);

  return (
    <KsAutocomplete
      className={classnames(`${bem}__attributes-section`, classes.option)}
      disableClearable
      disabled={isDisabled}
      getOptionLabel={(value) => translate(`entities.${value}.${value}`)}
      onChange={(_, value) => setField(index, value)}
      options={attributes.map((attribute) => attribute.name)}
      renderInput={(params) => (
        <KsTextField
          {...params}
          inputProps={{
            ...params.inputProps,
          }}
          InputProps={{ ...params.InputProps }}
        />
      )}
      value={filterRule.field}
    />
  );
}
function FilterRowInput({ filterRule, index }: FilterRowPartialProps) {
  const { setValue } = useFilterQueryActions();
  const [elementInputType, setElementInputType] = useState<ElementInputType | null>(null);
  const [, setSelectedOption] = useState<ListItem | null>(null);

  useEffect(() => {
    if (isNilOrEmpty(filterRule.field)) return;

    const filterElementInputType = getFilterElement({
      filterOperator: filterRule.operation,
      thingName: filterRule.field,
    });

    setElementInputType(filterElementInputType);
  }, [filterRule.field]);

  if (isFilterIdOnly(filterRule)) {
    return <DisplayIdFilter value={(filterRule.value as SingleFilterRuleValue).id} />;
  }

  const InputComponent = getInputElement(elementInputType);

  if (isNilOrEmpty(InputComponent)) return null;

  return (
    <InputComponent
      autoCompleteValues={[]}
      getInputElement={getInputElement}
      setSelectedOption={setSelectedOption}
      setValue={(value) => {
        setValue(index, {
          displayValue: value,
        });
      }}
      value={(filterRule.value as SingleFilterRuleValue).displayValue}
    />
  );
}

function FilterRowOperations({ classes, filterRule, index }: FilterRowPartialProps) {
  const { setOperation, translate } = useFilterQueryActions();
  const isDisabled = useIsFilterDisabled(filterRule);
  const [operationsOptions, setOperationsOptions] = useState<FilterOperation[]>([]);

  useEffect(() => {
    if (isNilOrEmpty(filterRule.field)) return;

    const newOperationsOptions = getFilterOperators(filterRule.field);

    setOperationsOptions(newOperationsOptions);
  }, [filterRule.field]);

  return (
    <KsAutocomplete
      className={classnames(`${bem}__operations-section`, classes.option)}
      disableClearable
      disabled={isDisabled}
      getOptionLabel={(value) => translate(`app.filter.operator.${value}`)}
      onChange={(_, value) => setOperation(index, value)}
      options={operationsOptions}
      renderInput={(params) => (
        <KsTextField
          {...params}
          inputProps={{
            ...params.inputProps,
          }}
          InputProps={{ ...params.InputProps }}
        />
      )}
      value={filterRule.operation}
    />
  );
}

function FilterRowRemove({ classes, index }: FilterRowPartialProps) {
  const { removeRule, translate } = useFilterQueryActions();

  return (
    <Tooltip title={translate('app.filterSelection.filter.remove')} placement="left">
      <IconButton
        className={classnames(`${bem}__remove-section`, classes.removeButton)}
        onClick={() => removeRule(index)}
      >
        <Clear style={{ fontSize: 17 }} />
      </IconButton>
    </Tooltip>
  );
}

function FilterRowWhere({ classes, index }: FilterRowPartialProps) {
  const { setCombinator, translate } = useFilterQueryActions();

  const shouldRenderWhereText = index === 0;

  if (shouldRenderWhereText) {
    return (
      <span className={classnames(`${bem}__where-text-section`, classes.where)}>
        {translate('app.filterSelection.section.where')}
      </span>
    );
  }

  return (
    <KsAutocomplete
      className={classnames(`${bem}__where-section`, classes.where)}
      disableClearable
      // TODO: @cafe enable this once filters support the OR operator, update this component value as well
      disabled
      getOptionLabel={(value) => translate(`app.filter.combinator.${value}`)}
      onChange={(_, value) => setCombinator(value)}
      options={[FilterCombinator.AND, FilterCombinator.OR]}
      renderInput={(params) => (
        <KsTextField
          {...params}
          inputProps={{
            ...params.inputProps,
          }}
          InputProps={{ ...params.InputProps }}
        />
      )}
      value={FilterCombinator.AND}
    />
  );
}

// Temporary component for id only filters, to be removed when we handle
// filters with both displayValue and id
function DisplayIdFilter({ value }: DisplayIdFilterProps) {
  return (
    <Tooltip title={value}>
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
    </Tooltip>
  );
}
//#endregion
