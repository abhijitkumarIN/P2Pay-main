import { DataListingArgs, GetListingDataResults } from '../types';
import { FakeDataEntity, UpdateDataStrategy } from '@kleeen/types';
import { FakeDataSource, filterList } from './filters/filters';
import { getPropertyFormat, toPropertyName } from './utils';

import { GenericEntityItem } from './types';
import { KapiCrud } from './kapiCrud';
import camelcase from 'lodash.camelcase';
import { cryptoRandom } from '@kleeen/backend/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { sortList } from './sorting';

const addAttributes = (attributes, entityItem) =>
  attributes.reduce((acc, attr) => {
    acc[attr.name] = entityItem[attr.name];
    return acc;
  }, {});

const addAttributesFormat = (entityName, attributes) =>
  attributes.reduce((acc, attr) => {
    const attributeName = entityName === attr.name ? 'displayValue' : attr.name;
    acc[attr.name] = getPropertyFormat(entityName, attributeName);
    return acc;
  }, {});

export const getListingData = ({
  attributes,
  entity,
  filters,
  latestRequestTimestamp,
  sorting,
}: DataListingArgs): GetListingDataResults | any => {
  const params = { attributes };

  if (entity === '[KS] GlobalApp') {
    const propName = toPropertyName(camelcase(attributes[0].name));
    const rawData = KapiCrud.rawList(camelcase(attributes[0].name)) as GenericEntityItem[];

    const format = addAttributesFormat(propName, attributes);

    return { format, data: [{ [propName]: rawData }] };
  }

  const rawData = KapiCrud.list(camelcase(entity), params) as FakeDataEntity[];
  const filteredData = filterList({
    entityName: entity,
    fakeDataSource: FakeDataSource.ListingData,
    filters,
    list: rawData,
  });
  const sortedData = sortList(filteredData, sorting);
  const entityName = toPropertyName(camelcase(entity));
  const displayValueCol = `displayValue::${entityName}`;

  const format = addAttributesFormat(entityName, attributes);

  const data = sortedData.map((entityItem) => {
    const withAttributes = addAttributes(attributes, entityItem);
    const parsedEntityItem = {
      id: entityItem.id,
      [displayValueCol]: entityItem[displayValueCol],
      ...withAttributes,
    };

    return parsedEntityItem;
  }) as GenericEntityItem[];

  const baseListingDataResults = { format, latestRequestTimestamp: Date.now() };

  if (isNilOrEmpty(latestRequestTimestamp)) {
    return { ...baseListingDataResults, data };
  }

  const randomSliceSize = cryptoRandom() * 5;
  const roundedSliceSize = Math.round(randomSliceSize);

  return {
    ...baseListingDataResults,
    data: data.slice().reverse().slice(0, roundedSliceSize),
    strategy: UpdateDataStrategy.PrependData, // *Once we add more strategies, we can determine this randomly
  };
};

export const getSummaryData = ({
  attributes,
  entity,
  filters,
  sorting,
}: DataListingArgs): GetListingDataResults | any => {
  const params = { attributes };
  const rawData = KapiCrud.list(camelcase(entity), params) as FakeDataEntity[];
  const filteredData = filterList({
    entityName: entity,
    fakeDataSource: FakeDataSource.ListingData,
    filters,
    list: rawData,
  });

  const sortedData = sortList(filteredData, sorting);
  const entityName = toPropertyName(camelcase(entity));
  const format = addAttributesFormat(entityName, attributes);

  const [firstData] = sortedData;
  const data = attributes.map((attr) => ({
    [attr.name]: firstData[attr.name],
  }));

  return { format, data };
};
