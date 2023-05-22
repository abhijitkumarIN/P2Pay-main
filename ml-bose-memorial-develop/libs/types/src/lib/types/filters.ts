import { AccessControlPermission, FilterCombinator, FilterOperation, Transformation } from '../enums';

import { PrimitiveType } from './base';

export type Filters = Record<string, any>;

export interface SingleFilterRuleValue {
  displayValue?: PrimitiveType;
  id?: PrimitiveType;
}

export interface FilterRule {
  combinator?: FilterCombinator;
  field: string;
  operation: FilterOperation;
  transformation?: Transformation;
  value: FilterRuleValue;
}

export type FilterRuleValue = SingleFilterRuleValue | SingleFilterRuleValue[];

export interface FilterQuery {
  combinator: FilterCombinator;
  rules: FilterRule[];
}

export interface WorkflowFilter {
  accessLevel: AccessControlPermission;
  name: string;
  statisticalType: string;
}
