import { DataPoint } from './base';
import { MouseEventHandler } from 'react';
import { ReactElement } from './react';

export interface ContextMenuDataPoint extends DataPoint {
  ignoreInContextMenu?: boolean;
}

export interface ContextMenuItem {
  handleClick: (item: ContextMenuItem) => MouseEventHandler;
  key: string;
  label: ReactElement;
  roleAccessKey: string;
}
