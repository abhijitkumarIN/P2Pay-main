import { FC } from 'react';
import { ViewShapeType } from '@kleeen/types';

export interface KsViewsManagerProps<T> {
  SubHeader: FC<T>;
  subHeaderProps: T;
  views: ViewShapeType[];
  taskName: string;
  containerClasses: string;
  pageIntroClasses: string;
  contentClasses: string;
  entityActions: Record<string, (...args: any[]) => void>;
}
