import { FilterRule, PrimitiveType } from '@kleeen/types';

import { ClassNameMap } from '@material-ui/styles';

export interface DisplayIdFilterProps {
  value: PrimitiveType;
}

export interface FilterRowProps {
  filterRule: FilterRule;
  index: number;
}

export interface FilterRowPartialProps extends FilterRowProps {
  classes: ClassNameMap;
}
