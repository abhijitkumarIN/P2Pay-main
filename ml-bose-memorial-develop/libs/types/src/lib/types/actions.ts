import { Attribute } from './attributes';
import { CustomWidget } from './custom-widget';
import { VizParams } from './widget';

export interface AddModalAttribute extends Attribute {
  params?: VizParams;
}

export interface Action {
  addModalAttributes?: AddModalAttribute[];
  areYouSure: boolean;
  component?: string | CustomWidget | undefined;
  description?: string;
  displayName: string;
  id?: string;
  name: string;
  type: string;
}
