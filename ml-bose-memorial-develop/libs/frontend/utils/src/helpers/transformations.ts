import { Attribute, DataPoint, FilterForNumerics, Transformation } from '@kleeen/types';

import { path } from 'ramda';

export const DEFAULT_TRANSFORMATION_KEY_TO_USE = 'aggregation';
const countTransformations = [Transformation.CountTotal, Transformation.CountUnique];
const singleCardinalityTransformations = [
  Transformation.Latest,
  Transformation.Max,
  Transformation.Min,
  Transformation.NoAggregation,
  Transformation.Oldest,
  Transformation.SelfMulti,
  Transformation.SelfSingle,
];

export function isCountTransformations(transformation: Transformation) {
  return countTransformations.includes(transformation);
}

export function isNumericType(attr: Attribute) {
  return attr?.format?.isNumericType || FilterForNumerics.includes(attr?.statisticalType || '');
}

export function isSameAttribute(attr1: Attribute, attr2: Attribute) {
  return attr1?.id === attr2?.id && attr1.transformation === attr2.transformation;
}

export function isSingleCardinalityTransformation(transformation: Transformation) {
  return singleCardinalityTransformations.includes(transformation);
}

export function isSingleCardinalityDataPoint(dataPoint: DataPoint): boolean {
  // TODO @cafe THIS MUST BE REMOVED ONCE WE GET RID OF THE AGGREGATION VS TRANSFORMATION DILEMMA.
  const { transformationKeyToUse = DEFAULT_TRANSFORMATION_KEY_TO_USE } = dataPoint;
  const attributeTransformation = path<Transformation>([transformationKeyToUse], dataPoint.attribute);
  return singleCardinalityTransformations.includes(attributeTransformation as Transformation);
}
