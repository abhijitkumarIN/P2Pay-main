import { Action, FilterQueryAction, FilterQueryProviderProps } from './filter-query-provider.model';
import { FilterCombinator, FilterOperation, FilterQuery, FilterRule, FilterRuleValue } from '@kleeen/types';
import { FilterQueryActionsContext, FilterQueryContext } from '../../hooks';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { defaultFilterQuery } from '../../filter-section.const';
import { getFilterOperators } from '@kleeen/elements';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function FilterQueryProvider({
  attributes,
  filterQuery,
  children,
  translate,
}: FilterQueryProviderProps) {
  const [filterQueryState, filterQueryDispatch] = useReducer(reducer, filterQuery, init);
  const [initialFilterQuery, setInitialFilterQuery] = useState<FilterQuery | null>(null);

  const addRule = useCallback(() => {
    filterQueryDispatch({ type: Action.AddRule, payload: { attributes } });
  }, [attributes]);

  const removeRule = useCallback((index: number) => {
    filterQueryDispatch({ type: Action.RemoveRule, payload: { index } });
  }, []);

  const reset = useCallback((newFilterQuery: FilterQuery) => {
    filterQueryDispatch({ type: Action.Reset, payload: { filterQuery: newFilterQuery } });
  }, []);

  const setCombinator = useCallback((combinator: FilterCombinator) => {
    filterQueryDispatch({ type: Action.SetCombinator, payload: { combinator } });
  }, []);

  const setField = useCallback((index: number, field: string) => {
    filterQueryDispatch({ type: Action.SetField, payload: { index, field } });
  }, []);

  const setOperation = useCallback((index: number, operation: FilterOperation) => {
    filterQueryDispatch({ type: Action.SetOperation, payload: { index, operation } });
  }, []);

  const setValue = useCallback((index: number, value: FilterRuleValue) => {
    filterQueryDispatch({ type: Action.SetValue, payload: { index, value } });
  }, []);

  useEffect(() => {
    if (isNilOrEmpty(filterQuery)) return;

    reset(filterQuery);
    setInitialFilterQuery(filterQuery);
  }, [filterQuery]);

  const filterQueryContextValue = useMemo(
    () => ({
      filterQuery: filterQueryState,
      initialFilterQuery,
    }),
    [filterQueryState, initialFilterQuery],
  );
  const filterQueryActionsContextValue = useMemo(
    () => ({
      addRule,
      attributes,
      removeRule,
      reset,
      setCombinator,
      setField,
      setOperation,
      setValue,
      translate,
    }),
    [addRule, attributes, removeRule, reset, setCombinator, setField, setOperation, setValue, translate],
  );

  return (
    <FilterQueryContext.Provider value={filterQueryContextValue}>
      <FilterQueryActionsContext.Provider value={filterQueryActionsContextValue}>
        {children}
      </FilterQueryActionsContext.Provider>
    </FilterQueryContext.Provider>
  );
}

//#region Private members
function init(filterQuery: FilterQuery) {
  if (isNilOrEmpty(filterQuery)) {
    return defaultFilterQuery;
  }

  return { ...filterQuery };
}

const defaultValue = { displayValue: null };

function reducer(state: FilterQuery, action: FilterQueryAction) {
  switch (action.type) {
    case Action.AddRule: {
      if (isNilOrEmpty(action.payload.attributes)) return state;

      const defaultThing = action.payload.attributes[0];
      const field = defaultThing.name;
      const availableOperations = getFilterOperators(defaultThing.name);
      const operation = isNilOrEmpty(availableOperations) ? FilterOperation.Is : availableOperations[0];

      return {
        ...state,
        rules: [
          ...state.rules,
          {
            field,
            operation,
            value: defaultValue,
          },
        ],
      };
    }
    case Action.RemoveRule: {
      const rulesClone = [...state.rules];

      rulesClone.splice(action.payload.index, 1);

      return {
        ...state,
        rules: rulesClone,
      };
    }
    case Action.Reset: {
      return init(action.payload.filterQuery);
    }
    case Action.SetCombinator:
      return {
        ...state,
        combinator: action.payload.combinator,
      };
    case Action.SetField: {
      const field = action.payload.field;
      const availableOperations = getFilterOperators(field);
      const operation = isNilOrEmpty(availableOperations) ? FilterOperation.Is : availableOperations[0];

      return {
        ...state,
        rules: setRule(state, action.payload.index, {
          field,
          operation,
          value: defaultValue,
        }),
      };
    }
    case Action.SetOperation:
      return {
        ...state,
        rules: setRule(state, action.payload.index, {
          operation: action.payload.operation,
          value: defaultValue,
        }),
      };
    case Action.SetValue:
      return {
        ...state,
        rules: setRule(state, action.payload.index, { value: action.payload.value }),
      };
    default:
      throw new Error('Unknown filter action');
  }
}

function setRule(state: FilterQuery, ruleIndex: number, newRulePartial: Partial<FilterRule>) {
  return state.rules.map((rule, index) => {
    if (index !== ruleIndex) return rule;

    return {
      ...rule,
      ...newRulePartial,
    };
  });
}
//#endregion
