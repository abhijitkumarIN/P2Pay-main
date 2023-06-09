import { DbItem, KapiDb } from '@kleeen/kleeen-api';
import { findEntityByName, generateDisplayMediaByType, toEntityName, toPropertyName } from './utils';

import { Attribute } from '../types';
import { PrimitiveType } from '@kleeen/types';
import { Transformation } from '../utils';
import { calculateTransformation } from './transformation';
import { isNil } from 'lodash';
import { omit } from 'ramda';

interface ListItem {
  id: string;
  $metadata?: Metadata;
  displayValue: PrimitiveType & {
    displayValue?: PrimitiveType;
  };
}

interface ListItemObject {
  [entityName: string]: ListItem;
}

type Metadata = { entityType: string };

const DISPLAY_VALUE = 'displayValue';
const METADATA = '$metadata';
const SELF_TRANSFORMATION = [Transformation.SelfSingle, Transformation.SelfMulti];

function getDisplayValueId(id: string, entity: Attribute, metadata: Metadata): string {
  if (!metadata) return id;

  if (entity?.isXor) {
    const xor = KapiDb.findRandomOne(toEntityName(metadata?.entityType));

    if (!xor?.id) throw new Error('The entity does not have id.');

    return xor.id;
  }

  return id;
}

function formatToDisplayValue(entityName: string, item: ListItem | any, attributes?: Attribute[]) {
  const displayValue = item.displayValue?.displayValue ?? item.displayValue;
  const attribute: Attribute = findEntityByName(entityName, attributes);
  const id = getDisplayValueId(item.id, attribute, displayValue && displayValue[METADATA]);

  return {
    id,
    [toPropertyName(entityName)]: {
      id,
      [DISPLAY_VALUE]: displayValue,
      displayMedia: generateDisplayMediaByType(attribute?.formatType, displayValue, attribute),
    },
    [`${DISPLAY_VALUE}::${toPropertyName(entityName)}`]: {
      // we need to figure out other way to solve this
      id,
      [DISPLAY_VALUE]: displayValue,
    },
  };
}

function getRandomItemByEntityName(entityName: string, attribute: Attribute, values: ListItem) {
  const entityHasManyValues = Array.isArray(values);
  const entityNameToFind = toEntityName(
    (!entityHasManyValues && values?.$metadata?.entityType) || entityName,
  );
  const randomEntity = KapiDb.findRandomOne(entityNameToFind);
  const displayValue = entityHasManyValues ? randomEntity.displayValue : values?.displayValue;

  const displayMedia = attribute
    ? generateDisplayMediaByType(attribute?.formatType, displayValue, attribute)
    : '';

  return {
    [entityName]: {
      id: randomEntity?.id,
      displayMedia,
      [DISPLAY_VALUE]: values[DISPLAY_VALUE],
      ...(values[METADATA] ? { [METADATA]: values[METADATA] } : {}),
    },
  };
}

function formatDefaultTransformation(entityName: string, attribute: Attribute, values: ListItem) {
  return {
    [entityName]: {
      [DISPLAY_VALUE]: calculateTransformation(
        Array.isArray(values) ? values.map((value) => value.displayValue) : [values.displayValue],
        attribute.aggregation,
      ),
    },
  };
}

function formatSelfMultiTransformation(entityName: string, values: ListItem) {
  const randomEntity = KapiDb.findRandomOne(toEntityName(values?.$metadata?.entityType || entityName));

  return {
    [entityName]: Array.isArray(values)
      ? values.map((value) => ({ ...value, id: randomEntity?.id }))
      : [values],
  };
}

function formatAttributesToDisplayValue(row: Record<string, ListItem>, attributes?: Attribute[]) {
  const item = omit(['$loki', 'meta', 'id', DISPLAY_VALUE], row);
  return Object.entries(item).reduce((acc, [entityName, values]: [string, any]) => {
    const attribute: Attribute = findEntityByName(entityName, attributes);

    if (attribute) {
      // TODO @carreta remove this when XORs can be aggregated [KSE3-1735]
      const isXorMultiple = attribute.isXor && attribute.hasMany;
      const isNotSelf = attribute.aggregation && !SELF_TRANSFORMATION.includes(attribute.aggregation);

      if ((attribute.aggregation && isNotSelf) || isXorMultiple) {
        return {
          ...acc,
          ...formatDefaultTransformation(entityName, attribute, values),
        };
      }
      if (attribute.hasMany || attribute.aggregation === Transformation.SelfMulti) {
        return {
          ...acc,
          ...formatSelfMultiTransformation(entityName, values),
        };
      }
    }

    return { ...acc, ...getRandomItemByEntityName(entityName, attribute, values) };
  }, {});
}

const toDisplayValue = (
  entityName: string,
  item: ListItem | any,
  attributes?: Attribute[],
): ListItemObject => {
  const formattedDisplayValue = formatToDisplayValue(entityName, item, attributes) as ListItemObject;
  const formattedAttributes = formatAttributesToDisplayValue(item, attributes);

  return { ...formattedDisplayValue, ...formattedAttributes };
};

export class KapiCrud {
  static add(entityName: string, entityObject: Record<string, unknown>) {
    const randomEntity = KapiDb.findRandomOne(toEntityName(entityName));

    if (!randomEntity) return entityObject;

    const parsedEntity: DbItem | { id?: string; meta?: any } = { ...randomEntity };

    delete parsedEntity.id;
    delete parsedEntity.meta;
    delete parsedEntity['$loki'];

    const newEntityObject = {
      ...parsedEntity,
      ...entityObject,
    };

    return KapiDb.insert(toEntityName(entityName), newEntityObject as DbItem);
  }

  static delete(entityName: string, id: string) {
    const wasDeleted = KapiDb.remove(toEntityName(entityName), id);
    return wasDeleted;
  }

  static list(entityName: string, params?: { attributes: Attribute[] }) {
    const list = KapiDb.listByName<ListItem>(toEntityName(entityName));

    if (!list) throw Error(`The ${entityName} does not exists`);

    const withDisplayValue = list.map((item) => toDisplayValue(entityName, item, params?.attributes));

    return withDisplayValue;
  }

  static rawList(entityName: string) {
    return KapiDb.listByName<ListItem>(toEntityName(entityName));
  }

  static get(entityName: string, id: string) {
    const item = KapiDb.findOne(toEntityName(entityName), id);

    if (isNil(item)) return [];

    const withDisplayValue = toDisplayValue(entityName, item);
    return withDisplayValue;
  }

  static update(entityName: string, entity: ListItem) {
    if (!entity.id && Array.isArray(entity[entityName])) {
      const newEntries = entity[entityName]
        .filter((item) => !item.id)
        .map((item) => KapiCrud.add(entityName, item));
      return newEntries;
    }

    const item = KapiDb.update(toEntityName(entityName), entity.id, entity);
    const withDisplayValue = toDisplayValue(entityName, item);

    return withDisplayValue;
  }

  static getFilters(attributes: string[]) {
    const attributesList = attributes || [];
    const filters = attributesList.reduce((acc, attribute) => {
      const result = KapiDb.getUniqueEntityAttributes(attribute);
      if (result && result.length) {
        acc[attribute] = result;
      }

      return acc;
    }, {});

    return {
      results: Object.entries(filters),
    };
  }
}
