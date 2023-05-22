import { Order } from '@kleeen/common/utils';
import React from 'react';

interface UseSortProps {
  setSorting?: (value: any) => void;
}

export function useSort(props: UseSortProps): [{ order: Order; orderBy: string }, (name: string) => void] {
  const [order, setSort] = React.useState<Order>(Order.asc);
  const [orderBy, setOrderBy] = React.useState('');

  const onSort = (name: string): void => {
    const newSortDirection = getNextSortDirection(order);

    if (newSortDirection === Order.none) {
      setSort(Order.none);
      setOrderBy('');
      if (props.setSorting) {
        props.setSorting([]);
      }
      return;
    }

    setSort(newSortDirection);
    setOrderBy(name);
    if (props.setSorting) {
      props.setSorting([{ columnName: name, sort: newSortDirection }]);
    }
  };

  return [{ order, orderBy }, onSort];
}

//#region Private members
function getNextSortDirection(order: Order): Order {
  if (order === Order.none) return Order.asc;

  return order === Order.asc ? Order.desc : Order.none;
}
//#endregion
