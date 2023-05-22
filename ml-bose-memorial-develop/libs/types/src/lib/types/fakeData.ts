import { DisplayMedia, PrimitiveType } from './base';

export type FakeDataValue = FakeDataAttribute | FakeDataAttribute[] | string;

export interface FakeDataAttribute {
  displayValue?: PrimitiveType;
  displayMedia?: DisplayMedia | string;
  id?: string;
}

export interface FakeDataEntity {
  id: string;
  [key: string]: FakeDataValue;
}
