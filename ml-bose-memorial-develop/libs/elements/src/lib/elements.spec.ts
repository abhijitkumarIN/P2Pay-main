import { ElementInputType, FilterOperation, Maybe, Thing } from '@kleeen/types';
import { getFilterElement, getFilterOperators } from './elements';

import mockThings from './mocks/things.mock.json';

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

describe('elements', () => {
  describe('get filter operators', () => {
    it(`should only return the "${FilterOperation.Is}" operator for a categorical statistical type`, () => {
      expect(getFilterOperators('cafe').sort()).toEqual([FilterOperation.Is].sort());
    });

    it(`should only return "${FilterOperation.Is}", "${FilterOperation.GreaterOrEqualThan}" and "${FilterOperation.LessOrEqualThan}" operators for an integer statistical type`, () => {
      expect(getFilterOperators('price').sort()).toEqual(
        [FilterOperation.Is, FilterOperation.GreaterOrEqualThan, FilterOperation.LessOrEqualThan].sort(),
      );
    });

    it(`should return the "${FilterOperation.Is}", "${FilterOperation.GreaterOrEqualThan}", "${FilterOperation.LessOrEqualThan}" and "${FilterOperation.RelativeDate}" operators for a timestamp statistical type`, () => {
      expect(getFilterOperators('importantEvent').sort()).toEqual(
        [
          FilterOperation.Is,
          FilterOperation.GreaterOrEqualThan,
          FilterOperation.LessOrEqualThan,
          FilterOperation.RelativeDate,
        ].sort(),
      );
    });
  });

  describe('get filter elements', () => {
    it(`should return the "${ElementInputType.FieldTextAutoComplete}" component for a categorical statistical type and the "${FilterOperation.Is}" operator`, () => {
      expect(getFilterElement({ thingName: 'cafe', filterOperator: FilterOperation.Is })).toEqual(
        ElementInputType.FieldTextAutoComplete,
      );
    });

    it(`should return the "${ElementInputType.CheckBox}" component for a binary statistical type and the "${FilterOperation.Is}" operator`, () => {
      expect(getFilterElement({ thingName: 'isOpen', filterOperator: FilterOperation.Is })).toEqual(
        ElementInputType.CheckBox,
      );
    });

    it.todo(
      `should return the "${ElementInputType.ColorPicker}" component for a color statistical type and the "${FilterOperation.Is}" operator`,
    );

    it(`should return the "${ElementInputType.FieldTextAutoComplete}" for a integer statistical type and the "${FilterOperation.Is}" operator`, () => {
      expect(getFilterElement({ thingName: 'price', filterOperator: FilterOperation.Is })).toEqual(
        ElementInputType.FieldTextAutoComplete,
      );
    });

    it(`should return the "${ElementInputType.FieldTextAutoComplete}" for a integer statistical type and the "${FilterOperation.GreaterOrEqualThan}" operator`, () => {
      expect(
        getFilterElement({ thingName: 'price', filterOperator: FilterOperation.GreaterOrEqualThan }),
      ).toEqual(ElementInputType.FieldTextAutoComplete);
    });

    it(`should return the "${ElementInputType.FieldTextAutoComplete}" for a integer statistical type and the "${FilterOperation.LessOrEqualThan}" operator`, () => {
      expect(
        getFilterElement({ thingName: 'price', filterOperator: FilterOperation.LessOrEqualThan }),
      ).toEqual(ElementInputType.FieldTextAutoComplete);
    });

    it(`should return the "${ElementInputType.DateTimeField}" for a timestamp statistical type and the "${FilterOperation.Is}" operator`, () => {
      expect(getFilterElement({ thingName: 'importantEvent', filterOperator: FilterOperation.Is })).toEqual(
        ElementInputType.DateTimeField,
      );
    });

    it(`should return the "${ElementInputType.DateTimeField}" for a timestamp statistical type and the "${FilterOperation.GreaterOrEqualThan}" operator`, () => {
      expect(
        getFilterElement({ thingName: 'importantEvent', filterOperator: FilterOperation.GreaterOrEqualThan }),
      ).toEqual(ElementInputType.DateTimeField);
    });

    it(`should return the "${ElementInputType.DateTimeField}" for a timestamp statistical type and the "${FilterOperation.LessOrEqualThan}" operator`, () => {
      expect(
        getFilterElement({ thingName: 'importantEvent', filterOperator: FilterOperation.LessOrEqualThan }),
      ).toEqual(ElementInputType.DateTimeField);
    });

    it(`should return the "${ElementInputType.RelativeDateDropdown}" component for a timestamp statistical type and the "${FilterOperation.RelativeDate}" operator`, () => {
      expect(
        getFilterElement({ thingName: 'importantEvent', filterOperator: FilterOperation.RelativeDate }),
      ).toEqual(ElementInputType.RelativeDateDropdown);
    });
  });
});
