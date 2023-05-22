import { createContext, useContext } from 'react';

import { FilterQueryActions } from './use-filter-query-actions.model';

export const FilterQueryActionsContext = createContext<FilterQueryActions>(null);

export function useFilterQueryActions() {
  const context = useContext<FilterQueryActions>(FilterQueryActionsContext);

  if (!context) {
    throw new Error('This hook cannot be consumed outside "FilterQueryProvider" component');
  }

  return context;
}
