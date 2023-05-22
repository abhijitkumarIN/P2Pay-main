import {
  FakeDataEntity,
  FilterCombinator,
  FilterOperation,
  FilterQuery,
  IntervalDate,
  Maybe,
  Thing,
} from '@kleeen/types';
import { FakeDataSource, filterList } from './filters';

import mockData from './mocks/listing.mock.json';
import mockThings from './mocks/things.mock.json';

const {
  capuchinoFelizCoffeeShop,
  chocolatito,
  latteMiCorazon,
  macchiato,
  mochachinoDulce,
  seriouslyBlack,
  sinAzucar,
  tripleCafeConLeche,
} = mockData;

export const listingMockData: FakeDataEntity[] = Object.values(mockData);

jest.mock('@kleeen/things', () => {
  return {
    getThingById(id: string): Maybe<Thing> {
      return mockThings[id];
    },
    getThingByName(name: string): Maybe<Thing> {
      return Object.values(mockThings).find((thing) => thing.name === name) as Thing;
    },
  };
});

describe('realisticFakeData', () => {
  const entityName = 'coffeeShop';

  describe('listing filters', () => {
    describe('using unexpected values', () => {
      it('should return the complete list of entities when there are no filter rules', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData).toEqual(listingMockData);
      });

      it('should return the complete list of entities when the field of the rule is empty', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              operation: FilterOperation.Is,
              value: { displayValue: 'Capuchino Feliz' },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData).toEqual(listingMockData);
      });

      it('should return the complete list of entities when the value of the filter is undefined', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData).toEqual(listingMockData);
      });

      it('should return the complete list of entities when the value of the filter is an empty object', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: {},
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData).toEqual(listingMockData);
      });

      it('should return the complete list of entities when the operation is missing', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              value: { displayValue: 'Capuchino Feliz' },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData).toEqual(listingMockData);
      });

      it('should return the complete list of entities when the operation is not a unknown one', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              value: { displayValue: 'Capuchino Feliz' },
              operation: 'absurdFilterOperation',
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData).toEqual(listingMockData);
      });
    });

    describe(`using the ${FilterOperation.Is} operator`, () => {
      it('should filter on an attribute with single values using a single string displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: 'Capuchino Feliz' },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
      });

      it('should filter on an attribute with single values using a single number displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'marketValue',
              operation: FilterOperation.Is,
              value: { displayValue: 8 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
      });

      it('should filter on an attribute with single values using a single id', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { id: 'e1c266f8-b31d-47b9-8b22-4cce57ecae1d' },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(macchiato);
      });

      it('should filter on an attribute with single values using multiple string displayValues', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: [{ displayValue: 'Capuchino Feliz' }, { displayValue: 'Mocachino Dulce' }],
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(2);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
        expect(filteredData).toContainEqual(mochachinoDulce);
      });

      it('should filter on an attribute with single values using multiple number displayValues', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'marketValue',
              operation: FilterOperation.Is,
              value: [{ displayValue: 8 }, { displayValue: 21 }],
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(2);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
        expect(filteredData).toContainEqual(chocolatito);
      });

      it('should filter on an attribute with single values using multiple ids', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: [
                { id: '26a85695-c945-4d35-bd0b-1a61b236ea09' },
                { id: '545fffcc-59b9-48df-acf4-4db5a1371823' },
                { id: '55e3d48f-4fcb-4212-8fbe-9d678f68b68e' },
              ],
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(3);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
        expect(filteredData).toContainEqual(mochachinoDulce);
        expect(filteredData).toContainEqual(seriouslyBlack);
      });
    });

    describe(`using the ${FilterOperation.GreaterOrEqualThan} operator`, () => {
      it('should not filter on an attribute with single values using an unexpected displayValue', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: '' },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: null },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: undefined },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: [] },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: {} },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(9);
        expect(filteredData).toEqual(listingMockData);
      });

      it('should filter on an attribute with single values using a single displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'marketValue',
              operation: FilterOperation.GreaterOrEqualThan,
              value: { displayValue: 88 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(2);
        expect(filteredData).toContainEqual(mochachinoDulce);
        expect(filteredData).toContainEqual(tripleCafeConLeche);
      });
    });

    describe(`using the ${FilterOperation.LessOrEqualThan} operator`, () => {
      it('should not filter on an attribute with single values using an unexpected displayValue', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: '' },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: null },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: undefined },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: [] },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.Is,
              value: { displayValue: {} },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(9);
        expect(filteredData).toEqual(listingMockData);
      });

      it('should filter on an attribute with single values using a single displayValue', () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'marketValue',
              operation: FilterOperation.LessOrEqualThan,
              value: { displayValue: 30 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(5);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
        expect(filteredData).toContainEqual(chocolatito);
        expect(filteredData).toContainEqual(macchiato);
        expect(filteredData).toContainEqual(seriouslyBlack);
        expect(filteredData).toContainEqual(sinAzucar);
      });
    });

    describe(`using the ${FilterOperation.RelativeDate} operator`, () => {
      it('should not filter on an attribute with single values using an unexpected relative value', () => {
        const filters = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'coffeeShop',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: '' },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: null },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: undefined },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: [] },
            },
            {
              field: 'coffeeShop',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: {} },
            },
            {
              field: 'timestamp',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: 678 },
            },
            {
              field: 'timestamp',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: 'unknownRelativeDate' },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters: filters as FilterQuery,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(9);
        expect(filteredData).toEqual(listingMockData);
      });

      it(`should filter on an attribute with single values using ${IntervalDate.allTime} aka "All Time"`, () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'timestamp',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: IntervalDate.allTime },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(9);
        expect(filteredData).toEqual(listingMockData);
      });

      it(`should filter on an attribute with single values using ${IntervalDate.oneWeek} aka "One Month"`, () => {
        const mockDate = 1633387281359;

        jest.spyOn(global.Date, 'now').mockImplementation(() => mockDate);

        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'timestamp',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: IntervalDate.oneWeek },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(1);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
      });

      it(`should filter on an attribute with single values using ${IntervalDate.threeMonth} aka "One Quarter"`, () => {
        const mockDate = 1633387281359;

        jest.spyOn(global.Date, 'now').mockImplementation(() => mockDate);

        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'timestamp',
              operation: FilterOperation.RelativeDate,
              value: { displayValue: IntervalDate.threeMonth },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(2);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
        expect(filteredData).toContainEqual(chocolatito);
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
              value: { displayValue: 6 },
            },
            {
              field: 'managerReview',
              operation: FilterOperation.LessOrEqualThan,
              value: { displayValue: 12 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(2);
        expect(filteredData).toContainEqual(capuchinoFelizCoffeeShop);
        expect(filteredData).toContainEqual(latteMiCorazon);
      });

      it(`should filter on an attribute with single values using a date range operator as single displayValue`, () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'timestamp',
              operation: FilterOperation.GreaterOrEqualThan,
              value: { displayValue: 1623247503734 },
            },
            {
              field: 'timestamp',
              operation: FilterOperation.LessOrEqualThan,
              value: { displayValue: 1632688882016 },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(5);
        expect(filteredData).toContainEqual(chocolatito);
        expect(filteredData).toContainEqual(macchiato);
        expect(filteredData).toContainEqual(mochachinoDulce);
        expect(filteredData).toContainEqual(seriouslyBlack);
        expect(filteredData).toContainEqual(sinAzucar);
      });

      it(`should not filter on an attribute with single values using an ${FilterCombinator.AND} combinator with not existing values`, () => {
        const filters: FilterQuery = {
          combinator: FilterCombinator.AND,
          rules: [
            {
              field: 'yearlyIncome',
              operation: FilterOperation.Is,
              value: { displayValue: 76 },
            },
            {
              field: 'barista',
              operation: FilterOperation.Is,
              value: { id: '898b2087-dda0-478a-91fe-a00ceb29b8a2' },
            },
          ],
        };

        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData.length).toBe(9);
        expect(filteredData).toEqual(listingMockData);
      });

      it.todo(`should filter on an attribute with single values using an ${FilterCombinator.OR} combinator`);

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
              ],
            },
            {
              field: 'marketValue',
              operation: FilterOperation.LessOrEqualThan,
              value: {
                displayValue: 10,
              },
            },
            {
              field: 'marketValue',
              operation: FilterOperation.GreaterOrEqualThan,
              value: {
                displayValue: 0,
              },
            },
            {
              field: 'timestamp',
              operation: FilterOperation.GreaterOrEqualThan,
              value: {
                displayValue: 1623247503734,
              },
            },
            {
              field: 'timestamp',
              operation: FilterOperation.LessOrEqualThan,
              value: {
                displayValue: 1623247503734,
              },
            },
          ],
        };
        const filteredData = filterList({
          entityName,
          fakeDataSource: FakeDataSource.ListingData,
          filters,
          list: listingMockData,
        });

        expect(filteredData).toMatchSnapshot();
      });
    });
  });
});
