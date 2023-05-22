import React, { ReactElement } from 'react';

import { DataListItem } from '@kleeen/types';
import { ListHeader } from './components';
import { ListProps } from './list.model';
import classnames from 'classnames';
import { useStyles } from './list.styles';

const bem = 'ks-list';

// TODO: move this to @kleeen/common-utils in KSE3-4727
const sortByType: { [key in 'string' | 'number']: (a: any, b: any) => number } = {
  string: categoricalSort,
  number: numericalSort,
};

export function KsList({
  columns,
  data,
  hideHeader,
  sortBy,
  ListItemComponent,
  ListItemProps,
}: ListProps): ReactElement {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchKey, setSearchKey] = React.useState('');
  const [sortedData, setSearchResults] = React.useState(data);

  React.useEffect(() => {
    if (data) renderData(data, searchTerm);
  }, [data, searchTerm]);

  function renderData(dataResults: DataListItem[], searchTermParam: string) {
    let results = sortBy
      ? dataResults.sort(function (a, b) {
          const aValue = a[sortBy].displayValue;
          const bValue = b[sortBy].displayValue;
          return sortByType?.[typeof aValue]?.(aValue, bValue);
        })
      : dataResults;
    if (searchTermParam) {
      results = results.filter((dataPoint) => {
        return String(dataPoint[searchKey]?.displayValue)
          .toLowerCase()
          .includes(searchTermParam.toLowerCase());
      });
    }
    setSearchResults(results);
  }

  return (
    <ul className={classnames(bem, classes.list)}>
      {!hideHeader ? (
        <ListHeader columns={columns} setSearchTerm={setSearchTerm} setSearchKey={setSearchKey}></ListHeader>
      ) : (
        ''
      )}
      {sortedData.map((dataPoint, i) => (
        <ListItemComponent key={i} {...ListItemProps} item={dataPoint} />
      ))}
    </ul>
  );
}

//#region Private members
function categoricalSort(a: string, b: string): number {
  return a.localeCompare(b);
}

function numericalSort(a: number, b: number): number {
  return b - a;
}
//#endregion
