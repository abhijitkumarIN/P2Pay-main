import { Maybe, Thing, ThingMap } from '@kleeen/types';

import { isNotNilOrEmpty } from '@kleeen/common/utils';
import { things } from './data';

const thingsById = Object.values(things).reduce((acc: ThingMap, curr) => {
  if (isNotNilOrEmpty(acc[curr.id])) {
    console.error(`Found a duplicate thing id when mapping things by id: ${curr.id}`);
    return acc;
  }

  acc[curr.id] = curr;
  return acc;
}, {});

export function getThingById(id: number | string): Maybe<Thing> {
  return thingsById[id];
}

export function getThingByName(name: string): Maybe<Thing> {
  return things[name];
}
