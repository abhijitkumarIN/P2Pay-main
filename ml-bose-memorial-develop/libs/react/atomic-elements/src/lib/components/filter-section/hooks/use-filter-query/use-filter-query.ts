import { createContext, useContext } from 'react';

import { FilterQueries } from './use-filter-query.model';

export const FilterQueryContext = createContext<FilterQueries>(null);

export function useFilterQuery() {
  const context = useContext<FilterQueries>(FilterQueryContext);

  if (!context) {
    throw new Error('This hook cannot be consumed outside "FilterQueryProvider" component');
  }

  return context;
}
