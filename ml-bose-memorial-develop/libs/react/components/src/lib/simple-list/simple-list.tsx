import { KsList } from '../list';
import { KsListItem } from '../list-item';
import { SimpleListProps } from './simple-list.model';

export function KsSimpleList({
  data,
  columns,
  hideHeader,
  listOptions,
  listItemOptions,
  metadata,
}: SimpleListProps) {
  return (
    <KsList
      columns={columns}
      data={data}
      hideHeader={hideHeader}
      sortBy={columns[0]?.name}
      ListItemComponent={KsListItem}
      ListItemProps={{ columns, metadata, ...listItemOptions }}
      {...listOptions}
    />
  );
}
