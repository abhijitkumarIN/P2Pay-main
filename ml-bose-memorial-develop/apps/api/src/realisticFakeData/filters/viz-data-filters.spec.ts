import { FakeDataSource, filterList } from './filters';
import { FilterCombinator, FilterOperation, FilterQuery, Maybe, Thing } from '@kleeen/types';
import { capuchinoFeliz, tripleCafeConLeche } from './mocks/viz-data.mock.json';

import mockThings from './mocks/things.mock.json';

const vizMockData = [capuchinoFeliz, tripleCafeConLeche];

jest.mock('@kleeen/things', () => {
  return {
    getThingById(id: string): Maybe<Thing> {
      return mockThings[id];
    },
    getThingByName(name: string) {
      return Object.values(mockThings).find((thing) => thing.name === name);
    },
  };
});

describe('realisticFakeData', () => {
  const entityName = 'coffeeShop';

  describe('viz data filters', () => {
    describe(`using the ${FilterOperation.Is} operator`, () => {
      it('should filter on an attribute with single values using a single string displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeQuality',
              operation: FilterOperation.Is,
              value: {
                displayValue: 'OK',
              },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.VisualizationData,
          filters,
          list: vizMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(tripleCafeConLeche);
      });

      it('should filter on an attribute with single values using a single id', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: {
                id: '7ec2f25e-fa6a-499c-acab-b182bb76c1f3',
              },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.VisualizationData,
          filters,
          list: vizMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(capuchinoFeliz);
      });
    });

    describe(`using the ${FilterOperation.GreaterOrEqualThan} operator`, () => {
      it('should filter on an attribute with single values using a single displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'managerReview',
              operation: FilterOperation.GreaterOrEqualThan,
              value: { displayValue: 21 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.VisualizationData,
          filters,
          list: vizMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(tripleCafeConLeche);
      });
    });

    describe(`using the ${FilterOperation.LessOrEqualThan} operator`, () => {
      it('should filter on an attribute with single values using a single displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'occupationPercent',
              operation: FilterOperation.LessOrEqualThan,
              value: { displayValue: 68 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.VisualizationData,
          filters,
          list: vizMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(capuchinoFeliz);
      });
    });

    describe('using operation combination', () => {
      it('should filter on an attribute with single values using a range operator as single displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'managerReview',
              operation: FilterOperation.GreaterOrEqualThan,
              value: { displayValue: 4 },
            },
            {
              field: 'managerReview',
              operation: FilterOperation.LessOrEqualThan,
              value: { displayValue: 21 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.VisualizationData,
          filters,
          list: vizMockData,
        });

        expect(filteredData.length).toBe(2);
        expect(filteredData).toEqual(vizMockData);
      });

      it('should filter on an attribute with single values using a combination of operations', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeQuality',
              operation: FilterOperation.Is,
              value: [
                {
                  displayValue: 'Gross',
                },
                {
                  displayValue: 'OK',
                },
              ],
            },
            {
              field: 'inauguration',
              operation: FilterOperation.GreaterOrEqualThan,
              value: {
                displayValue: 1623130112150,
              },
            },
            {
              field: 'inauguration',
              operation: FilterOperation.LessOrEqualThan,
              value: {
                displayValue: 1628141634678,
              },
            },
            {
              field: 'marketValue',
              operation: FilterOperation.LessOrEqualThan,
              value: {
                displayValue: 61,
              },
            },
            {
              field: 'squareFootage',
              operation: FilterOperation.GreaterOrEqualThan,
              value: {
                displayValue: 2000,
              },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: vizMockData,
        });

        expect(filteredData).toMatchSnapshot();
      });
    });
  });
});
