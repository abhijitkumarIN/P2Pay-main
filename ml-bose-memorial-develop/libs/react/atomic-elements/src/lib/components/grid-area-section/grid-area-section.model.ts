import { Key } from 'react';
import { Widget } from '@kleeen/types';

export interface GridAreaSectionProps {
  className?: string;
  columnWidth?: number;
  entityId?: Key;
  entityName: string;
  sortableColumns?: boolean;
  taskName: string;
  widget: Widget;
}
