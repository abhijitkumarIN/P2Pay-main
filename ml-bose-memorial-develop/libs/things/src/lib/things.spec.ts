import { ActionType, StatisticalDataType, ThingMap } from '@kleeen/types';
import { getThingById, getThingByName } from './things';

jest.mock('./data/things', () => {
  const mockedThings: ThingMap = {
    myThing: {
      actions: [
        {
          areYouSure: true,
          description: undefined,
          displayName: `Do Stuff`,
          id: `06c88421-ebf3-458f-a8ed-c0b1413f4103`,
          isCustomModal: false,
          name: `doStuff`,
          type: ActionType.Custom,
        },
        {
          areYouSure: true,
          description: undefined,
          displayName: `Do Something`,
          id: `44e34320-f0f6-46d2-a790-dbdbbe491bd4`,
          isCustomModal: false,
          name: `doSomething`,
          type: ActionType.Custom,
        },
      ],
      attributes: [
        {
          hasMany: true,
          isNullable: false,
          name: 'Cool Attribute 1',
        },
      ],
      canAddValues: false,
      canEditValues: true,
      crossLinking: [],
      description: undefined,
      displayName: `My Thing`,
      id: 1,
      dataType: `string`,
      deepDataType: undefined,
      editable: true,
      format: {
        examples: ['1 Thing', '2 Things', '3 Things'],
      },
      formatType: `prime`,
      multiple: true,
      name: `myThing`,
      prototypeId: undefined,
      settings: { isEditable: true, isFilledByEU: true },
      statisticalType: StatisticalDataType.Categorical,
      type: `string`,
    },
    coolThing: {
      actions: [
        {
          areYouSure: false,
          description: undefined,
          displayName: `Add`,
          id: `a5b3add2-5592-49a9-b401-e644d845554a`,
          isCustomModal: false,
          name: `add`,
          type: ActionType.Add,
        },
        {
          areYouSure: false,
          description: undefined,
          displayName: `Delete`,
          id: `5f4317a7-db60-4883-a7c5-4e7676af6175`,
          isCustomModal: false,
          name: `_delete_`,
          type: ActionType.Delete,
        },
      ],
      attributes: [
        {
          hasMany: false,
          isNullable: false,
          name: 'Cool Attribute 2',
        },
      ],
      canAddValues: true,
      canEditValues: true,
      crossLinking: [],
      description: undefined,
      displayName: `Cool Thing`,
      id: 2,
      dataType: `first_name`,
      deepDataType: undefined,
      editable: true,
      format: {},
      formatType: `first_name`,
      multiple: true,
      name: `coolThing`,
      prototypeId: undefined,
      settings: { isEditable: true, isFilledByEU: true },
      statisticalType: StatisticalDataType.FreeForm,
      type: `first_name`,
    },
  };
  return {
    things: mockedThings,
  };
});

describe('things', () => {
  it('should get things by id', () => {
    const myThing = getThingById(1);
    expect(myThing).toBeTruthy();
    expect(myThing?.name).toBe('myThing');
  });

  it('should get things by name', () => {
    const coolThing = getThingByName('coolThing');
    expect(coolThing).not.toBeNull();
    expect(coolThing?.id).toBe(2);
  });
});
