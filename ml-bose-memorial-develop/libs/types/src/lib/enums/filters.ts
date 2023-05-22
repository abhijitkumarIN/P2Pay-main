export enum FilterCombinator {
  AND = 'AND',
  OR = 'OR',
}

export enum FilterOperation {
  GreaterOrEqualThan = '>=',
  Is = '=',
  LessOrEqualThan = '<=',
  RelativeDate = 'relativeDate',
}

/**
 * @deprecated This will be deprecated in coming Releases, please only use it for testing purposes, use FilterOperation instead.
 */
export enum FilterOperators {
  from = 'from',
  in = '_in',
  max = 'max',
  min = 'min',
  relativeDate = 'relativeDate',
  to = 'to',
}
