import { FilterQuery, Thing, Translate } from '@kleeen/types';

export interface FilterSectionProps {
  attributes: Thing[];
  filterQuery: FilterQuery;
  onFilter: (filterQuery: FilterQuery) => void;
  translate: Translate;
}
