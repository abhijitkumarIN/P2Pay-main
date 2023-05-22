import {
  Attribute,
  FilterCombinator,
  FilterOperation,
  FilterQuery,
  FilterRuleValue,
  Translate,
} from '@kleeen/types';

export interface FilterQueryActions {
  addRule: () => void;
  attributes: Attribute[];
  removeRule: (index: number) => void;
  reset: (newFilterQuery: FilterQuery) => void;
  setCombinator: (combinator: FilterCombinator) => void;
  setField: (index: number, field: string) => void;
  setOperation: (index: number, operation: FilterOperation) => void;
  setValue: (index: number, value: FilterRuleValue) => void;
  translate: Translate;
}
