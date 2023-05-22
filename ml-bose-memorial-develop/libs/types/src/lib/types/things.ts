import { ActionType, StatisticalDataType } from '../enums';

import { FormatProps } from './format';
import { Link } from './link';

export interface ThingSettings {
  isAvatarEditable?: boolean;
  isFilledByEU?: boolean;
  isEditable?: boolean;
}

export interface ThingAttribute {
  hasMany: boolean;
  isNullable: boolean;
  name: string;
}

export interface ThingAction {
  areYouSure: boolean;
  component?: string;
  description?: string;
  displayName: string;
  id: string;
  isCustomModal?: boolean;
  mockupUrl?: string;
  name: string;
  type: ActionType;
}

export interface Thing {
  actions: ThingAction[];
  attributes: ThingAttribute[];
  canAddValues?: boolean;
  canEditValues?: boolean;
  crossLinking: Link[];
  dataType?: string;
  deepDataType?: string;
  description?: string;
  displayName: string;
  editable?: boolean;
  format?: FormatProps;
  formatType?: string;
  id: number;
  multiple: boolean;
  name: string;
  prototypeId?: number;
  settings?: ThingSettings;
  statisticalType?: StatisticalDataType;
  type?: string;
}

export interface ThingMap {
  [key: string]: Thing;
}
