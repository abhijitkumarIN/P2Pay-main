import { Action, GenericFunctions, SetCurrentViewType, ViewShapeType } from '@kleeen/types';

export interface Attribute {
  name: string;
  type?: string;
}

export type HandleChangeTab = (value: number | unknown) => void;

export interface TabSwitcherProps {
  currentView: ViewShapeType;
  setCurrentView: SetCurrentViewType;
  viewOptions: ViewShapeType[];
}

export interface ViewDropdownProps {
  setCurrentView: SetCurrentViewType;
  viewOptions: ViewShapeType[];
}

export interface SwitcherProps extends TabSwitcherProps {
  showDropDown: boolean;
}

export interface UseActionsProps {
  entityActions: Record<string, (...args: any[]) => void>;
  currentView: ViewShapeType;
  actions: Action[];
}

export interface DataViewControlSectionProps extends TabSwitcherProps {
  actions?: Action[];
  attributes: Attribute[];
  currentView: ViewShapeType;
  description?: string;
  entity?: string;
  entityActions?: GenericFunctions;
  hideRefreshControl?: boolean;
  isEntityDetails?: boolean;
  objectValue: string;
  order?: number;
  parent?: { id: string; entity: string };
  results: string;
  setCurrentView: SetCurrentViewType;
  showActions: boolean;
  showAvatar: boolean;
  showDesc: boolean;
  /**
   * @deprecated since it is calculated in the atomic element.
   */
  showDropDown: boolean;
  showTitle: boolean;
  taskName: string;
  title?: string;
}

export enum DisplayViewType {
  FullView = 'fullView',
  Grid = 'grid',
  Listing = 'listing',
}
