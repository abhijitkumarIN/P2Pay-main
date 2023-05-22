import { Widget, WidgetScope } from '@kleeen/types';

export interface WidgetByIdMap {
  [key: string]: Widget;
}

export interface WidgetByEntityBaseParam {
  entityId: number | string;
  scope: WidgetScope;
}
