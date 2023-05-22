import { SetCurrentViewType, ViewShapeType } from '@kleeen/types';

export interface ButtonSelectProps {
  viewOptions: ViewShapeType[];
  taskName?: string;
  currentView: ViewShapeType;
  setCurrentView: SetCurrentViewType;
}
