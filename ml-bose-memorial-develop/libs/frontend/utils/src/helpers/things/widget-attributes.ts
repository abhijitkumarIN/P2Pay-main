import { Widget } from '@kleeen/types';

export function getAttributeFromName({ attributeName, widget }: { attributeName: string; widget: Widget }) {
  return widget?.attributes.find((attribute) => attribute.name === attributeName);
}
