import {
  Attribute,
  FilterCombinator,
  FilterOperation,
  FilterQuery,
  FilterRuleValue,
  ReactElement,
  Thing,
  Translate,
} from '@kleeen/types';

export enum Action {
  AddRule = 'addRule',
  RemoveRule = 'removeRule',
  Reset = 'reset',
  SetCombinator = 'setCombinator',
  SetField = 'setField',
  SetOperation = 'setOperation',
  SetValue = 'setValue',
}

export type FilterQueryAction =
  | { type: Action.AddRule; payload: { attributes: Attribute[] } }
  | { type: Action.RemoveRule; payload: { index: number } }
  | { type: Action.Reset; payload: { filterQuery: FilterQuery } }
  | { type: Action.SetCombinator; payload: { combinator: FilterCombinator } }
  | { type: Action.SetField; payload: { field: string; index: number } }
  | { type: Action.SetOperation; payload: { index: number; operation: FilterOperation } }
  | { type: Action.SetValue; payload: { index: number; value: FilterRuleValue } };

export interface FilterQueryProviderProps {
  attributes: Thing[];
  children: ReactElement;
  filterQuery: FilterQuery;
  translate: Translate;
}
