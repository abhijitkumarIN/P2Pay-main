import { ViewShapeType } from '@kleeen/types';

export interface ViewSwitcherProps {
  currentView: ViewShapeType;
  setCurrentView: (newCurrentViewShapeType: ViewShapeType) => void;
  /**
   * @deprecated since it is calculated in the element [KSE3-4366].
   */
  showDropDown?: boolean;
  taskName: string;
  viewOptions: ViewShapeType[];
}
