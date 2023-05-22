import { SetCurrentViewType, TranslateProps, ViewShapeType } from '@kleeen/types';

import { ActionsManagerProps } from '@kleeen/react/components';
import { EntityDetailsSectionProps } from '../EntityDetailsSection/EntityDetailsSection';
import { FilterProps } from '../SubHeader/component/ButtonFilter/ButtonFilter.model';

export interface HeaderAndSubSectionsProps extends TranslateProps {
  actionsProps: ActionsManagerProps;
  currentView: ViewShapeType;
  filters?: FilterProps[];
  hideRefreshControl?: boolean;
  objectValue: string;
  setCurrentView: SetCurrentViewType;
  subTitle?: string;
  taskName: string;
  title: string;
  upText?: string;
  viewOptions: ViewShapeType[];
  withDateFilter?: boolean;
  withFilterSection?: boolean;
  withSummarySection?: EntityDetailsSectionProps;
}
