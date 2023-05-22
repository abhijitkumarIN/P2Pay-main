import { Attribute, DataListItem, DataListMetaData } from '@kleeen/types';

import { ListItemProps } from '../list-item';
import { ListProps } from '../list/list.model';

export interface SimpleListProps {
  columns: Attribute[];
  data: DataListItem[];
  hideHeader?: boolean;
  listOptions?: Partial<ListProps>;
  listItemOptions?: Partial<ListItemProps>;
  metadata?: DataListMetaData;
}
