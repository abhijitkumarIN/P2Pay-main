import { FakeDataAttribute, FakeDataEntity, Sorting } from '@kleeen/types';

export const sortList = (list: FakeDataEntity[], sortingList: Sorting = []) => {
  const sortedList = list;

  sortingList.forEach((sortObject) => {
    const key = sortObject.columnName;
    const isAsc = sortObject.sort === 0;

    sortedList.sort((entityA, entityB) => {
      const compareAttributeA = entityA[key] as FakeDataAttribute;
      const compareAttributeB = entityB[key] as FakeDataAttribute;
      const valueA = compareAttributeA?.displayValue || 0;
      const valueB = compareAttributeB?.displayValue || 0;
      return valueA == valueB ? 0 : (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
    });
  });

  return sortedList;
};
